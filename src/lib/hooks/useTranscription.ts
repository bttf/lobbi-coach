import { useEffect, useState } from "react";
import { RealtimeTranscriber } from "assemblyai";

let rt: RealtimeTranscriber | null;
let texts: Record<number, string> = {};
let timeoutHandler: NodeJS.Timeout | null;

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

type UseTranscriptionHook = () => {
  sendAudio: (audioData: Uint8Array) => void;
  transcript: string;
  resetTranscript: () => void;
  connect: () => void;
  connecting: boolean;
  disconnect: () => void;
  connected: boolean;
};

const useTranscription: UseTranscriptionHook = () => {
  const [transcript, setTranscript] = useState("");
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const fetchToken = async () => {
    const res = await fetch("/aai-token", { method: "POST" });
    const json = await res.json();
    return json.token;
  };

  const initTranscriber = async (token: string) => {
    try {
      rt = new RealtimeTranscriber({ token });

      rt.on("transcript", (message) => {
        console.log("transcriptin", message.text);
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

      setConnected(true);
    } catch (e) {
      console.error("useTranscription - trouble connecting", e);
      setConnected(false);
    }
  };

  const resetTranscript = () => {
    texts = {};
    setTranscript(coalesceTextsIntoStr());
  };

  const connect = async () => {
    setConnecting(true);
    const token = await fetchToken();
    await initTranscriber(token);
    setConnecting(false);
  };

  const disconnect = () => {
    if (!rt) return;
    rt.close();
    rt = null;
    setConnected(false);
  };

  const sendAudio = (data: Uint8Array<ArrayBufferLike>) => {
    console.log("recvng audio");
    if (!rt) return;
    // @ts-expect-error it works somehow
    rt.sendAudio(data);
  };

  // close connection after 45 sec of inactivity
  useEffect(() => {
    if (timeoutHandler) clearTimeout(timeoutHandler);
    if (!connected) timeoutHandler = null;
    else {
      timeoutHandler = setTimeout(() => {
        disconnect();
      }, 45 * 1000);
    }
  }, [connected, transcript]);

  return {
    sendAudio,
    transcript,
    resetTranscript,
    connect,
    disconnect,
    connecting,
    connected,
  };
};
export default useTranscription;
