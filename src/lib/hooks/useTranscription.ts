import { useEffect, useState } from "react";
import { RealtimeTranscriber } from "assemblyai";

type UseTranscriptionHook = () => {
  loading: boolean;
  sendAudio: (audioData: Uint8Array) => void;
  transcript: string;
  setTranscript: (t: string) => void;
  reset: () => void;
  startTranscribing: () => void;
  stopTranscribing: () => void;
};

let rt: RealtimeTranscriber | null;
let texts: Record<number, string> = {};

const coalesceTextsIntoStr = () => {
  let msg = "";
  const keys = Object.keys(texts);
  // @ts-expect-error no it doesnt
  keys.sort((a, b) => a - b);
  for (const key of keys) {
    // @ts-expect-error be quiet
    if (texts[key]) {
      // @ts-expect-error be quiet
      msg += ` ${texts[key]}`;
    }
  }
  return msg;
};

const useTranscription: UseTranscriptionHook = () => {
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  const fetchToken = async () => {
    const res = await fetch("/aai-token", { method: "POST" });
    const json = await res.json();
    return json.token;
  };

  const initTranscriber = async (token: string) => {
    rt = new RealtimeTranscriber({ token });

    rt.on("transcript", (message) => {
      texts[message.audio_start] = message.text;
      setTranscript(coalesceTextsIntoStr());
    });

    rt.on("error", async (error) => {
      console.error(error);
      await rt?.close();
    });

    rt.on("close", (event) => {
      console.log(event);
      rt = null;
    });

    await rt.connect();
  };

  const reset = () => {
    texts = {};
    setTranscript(coalesceTextsIntoStr());
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const startTranscribing = async () => {
    setLoading(true);
    const token = await fetchToken();
    await initTranscriber(token);
    setLoading(false);
  };

  const stopTranscribing = async () => {
    setLoading(true);
    await rt?.close();
    rt = null;
    setLoading(false);
  };

  const sendAudio = (data: Uint8Array) => {
    if (loading) return;
    if (!rt) return;
    // @ts-expect-error shaddapa your moutha
    rt.sendAudio(data);
  };

  return {
    loading,
    sendAudio,
    transcript,
    setTranscript,
    reset,
    startTranscribing,
    stopTranscribing,
  };
};
export default useTranscription;
