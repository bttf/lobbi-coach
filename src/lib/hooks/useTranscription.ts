import { useEffect, useState } from "react";
import { RealtimeTranscriber } from "assemblyai";

type UseTranscriptionHook = () => {
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
    console.log("connected", rt);
  };

  const reset = () => {
    texts = {};
    setTranscript(coalesceTextsIntoStr());
  };

  useEffect(() => {
    fetchToken();
  }, []);

  const startTranscribing = async () => {
    const token = await fetchToken();
    await initTranscriber(token);
  };
  const stopTranscribing = async () => {
    console.log("closing transcriber", { rt });
    await rt?.close();
    console.log("debug", rt);
    rt = null;
    console.log("debug2", rt);
  };

  return {
    // @ts-expect-error shaddapa your moutha
    sendAudio: (data) => rt?.sendAudio(data),
    transcript,
    setTranscript,
    reset,
    startTranscribing,
    stopTranscribing,
  };
};
export default useTranscription;
