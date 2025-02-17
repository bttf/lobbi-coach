import { useEffect, useState } from "react";

function mergeBuffers(lhs: Int16Array, rhs: Int16Array) {
  const mergedBuffer = new Int16Array(lhs.length + rhs.length);
  mergedBuffer.set(lhs, 0);
  mergedBuffer.set(rhs, lhs.length);
  return mergedBuffer;
}

class Recording {
  stream: MediaStream;
  audioContext?: AudioContext;
  audioWorkletNode?: AudioWorkletNode;
  source?: MediaStreamAudioSourceNode;
  audioBufferQueue = new Int16Array(0);
  onAudioCallback: OnAudioCallback | null = null;

  constructor(stream: MediaStream) {
    this.stream = stream;
  }

  async start() {
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

      this.audioBufferQueue = mergeBuffers(
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
        if (this.onAudioCallback) this.onAudioCallback(finalBuffer);
      }
    };
  }

  setAudioCallback(onAudioCallback: OnAudioCallback | null) {
    this.onAudioCallback = onAudioCallback;
  }
}

type OnAudioCallback = (audioData: Uint8Array) => void;

type UseMicrophoneHook = () => {
  loading: boolean;
  setAudioCallback: (cb: OnAudioCallback | null) => void;
};

const useMicrophone: UseMicrophoneHook = () => {
  const [loading, setLoading] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState<Recording | null>(null);

  // will ask user for mic permission if we dont already have
  const getMicPermission = async () => {
    try {
      setLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(stream);
      setLoading(false);
    } catch (e) {
      console.error("getMicPermission - an error occured", e);
    }
  };

  const setAudioCallback = (cb: OnAudioCallback | null) => {
    if (!recording) return;
    recording.setAudioCallback(cb);
  };

  useEffect(() => {
    getMicPermission();
  }, []);

  useEffect(() => {
    if (!stream) return;
    const rec = new Recording(stream);
    rec.start();
    setRecording(rec);
  }, [stream]);

  return {
    loading,
    setAudioCallback,
  };
};

export default useMicrophone;
