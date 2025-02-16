import { useEffect, useState } from "react";
import { RealtimeTranscriber } from "assemblyai";

type UseTranscriptionHook = () => {
  sendAudio: (audioData: Uint8Array) => void;
  transcript: string;
  reset: () => void;
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
  const [token, setToken] = useState("");
  const [transcript, setTranscript] = useState("");

  const fetchToken = async () => {
    const res = await fetch("/aai-token", { method: "POST" });
    const json = await res.json();
    setToken(json.token);
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

  useEffect(() => {
    if (!token) return;
    initTranscriber(token);
    return () => {
      console.log("tearing down transcriber");
      rt?.close();
    };
  }, [token]);

  return {
    // @ts-expect-error shaddapa your moutha
    sendAudio: (data) => rt?.sendAudio(data),
    transcript,
    reset,
  };
};
export default useTranscription;
