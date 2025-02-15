import { useEffect, useState } from "react";
import { RealtimeTranscriber } from "assemblyai";

type UseTranscriptionHook = () => {
  sendAudio: (audioData: Uint8Array) => void;
  transcript: string;
};

let rt: RealtimeTranscriber | null;

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
    const texts: Record<number, string> = {};

    rt.on("transcript", (message) => {
      let msg = "";
      texts[message.audio_start] = message.text;
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
      setTranscript(msg);
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

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;
    console.log("init'ing transcriber");
    initTranscriber(token);
    return () => {
      console.log("tearing down transcriber");
      rt?.close();
    };
  }, [token]);
  console.log("rt", rt);
  console.log("rt.sendAudio", rt?.sendAudio);
  return {
    // @ts-expect-error shaddapa your moutha
    sendAudio: (data) => rt?.sendAudio(data),
    transcript,
  };
};
export default useTranscription;
