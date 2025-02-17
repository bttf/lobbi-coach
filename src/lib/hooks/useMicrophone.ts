import { useEffect, useState } from "react";

type OnAudioCallback = (audioData: Uint8Array) => void;
type UseMicrophoneHook = (args: {
  onAudio: OnAudioCallback;
  onStart: () => void;
  onStop: () => void;
}) => {
  loading: boolean;
  hasPermission: boolean;
  requestPermission: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
};

class Recording {
  stream: MediaStream;
  audioContext?: AudioContext;
  audioWorkletNode?: AudioWorkletNode;
  source?: MediaStreamAudioSourceNode;
  audioBufferQueue = new Int16Array(0);

  constructor(stream: MediaStream) {
    this.stream = stream;
  }

  mergeBuffers(lhs: Int16Array, rhs: Int16Array) {
    const mergedBuffer = new Int16Array(lhs.length + rhs.length);
    mergedBuffer.set(lhs, 0);
    mergedBuffer.set(rhs, lhs.length);
    return mergedBuffer;
  }

  async start(onAudioCallback: OnAudioCallback) {
    this.audioContext = new AudioContext({
      sampleRate: 16_000,
      latencyHint: "balanced",
    });
    this.source = this.audioContext.createMediaStreamSource(this.stream);
    await this.audioContext.audioWorklet.addModule("audio-processor.js");
    this.audioWorkletNode = new AudioWorkletNode(
      this.audioContext,
      "audio-processor"
    );
    this.source.connect(this.audioWorkletNode);
    this.audioWorkletNode.connect(this.audioContext.destination);

    this.audioWorkletNode.port.onmessage = (event) => {
      if (!this.audioContext) return;

      const currentBuffer = new Int16Array(event.data.audio_data);

      this.audioBufferQueue = this.mergeBuffers(
        this.audioBufferQueue,
        currentBuffer
      );

      const bufferDuration =
        (this.audioBufferQueue.length / this.audioContext.sampleRate) * 1000;

      // wait until we have 100ms of audio data
      if (bufferDuration >= 100) {
        const totalSamples = Math.floor(this.audioContext.sampleRate * 0.1);

        const finalBuffer = new Uint8Array(
          this.audioBufferQueue.subarray(0, totalSamples).buffer
        );

        this.audioBufferQueue = this.audioBufferQueue.subarray(totalSamples);
        if (onAudioCallback) onAudioCallback(finalBuffer);
      }
    };
  }

  // stop() {
  //   // this.stream.getTracks().forEach((track) => track.stop());
  //   this.audioContext?.close();
  //   this.audioBufferQueue = new Int16Array(0);
  // }
}

const checkMicrophonePermission = async () => {
  let hasPermission = false;

  try {
    // @ts-expect-error 'microphone' is indeed a permission name bruv
    const res = await navigator.permissions.query({ name: "microphone" });
    hasPermission = res.state === "granted";
  } catch (e) {
    console.error("checkMicrophonePermission - an error occured", e);
  }

  return hasPermission;
};

const useMicrophone: UseMicrophoneHook = ({ onAudio, onStart, onStop }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState<Recording | null>(null);

  const updatePermission = async () => {
    setLoading(true);
    const hasPerm = await checkMicrophonePermission();
    setHasPermission(hasPerm);
    setLoading(false);
  };

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(stream);
      updatePermission();
    } catch (e) {
      console.error("requestPermission - not granted", e);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    if (recording) {
      console.error("startRecording - already have a recording in progress");
      return;
    }
    const rec = new Recording(stream);
    rec.start(onAudio);
    setRecording(rec);
    onStart();
  };

  const stopRecording = () => {
    if (!recording) {
      console.error("stopRecording - no recording in progress");
      return;
    }
    // recording.stop();
    setRecording(null);
    onStop();
  };

  useEffect(() => {
    updatePermission();
  }, []);

  useEffect(() => {
    if (hasPermission && !stream) requestPermission(); // set stream
  }, [hasPermission, stream]);

  return {
    loading,
    hasPermission,
    requestPermission,
    startRecording,
    stopRecording,
    isRecording: !!recording,
  };
};

export default useMicrophone;
