"use client";
import { PauseIcon, PlayIcon } from "lucide-react";
import useMicrophone from "@/lib/hooks/useMicrophone";
import usePrompting from "@/lib/hooks/usePrompting";
import useTranscription from "@/lib/hooks/useTranscription";
import Button from "@/components/ui/Button";
import MicPermissionModal from "@/components/MicPermissionModal";
import MicrophoneButton from "@/components/MicrophoneButton";
import Textarea from "@/components/ui/Textarea";
import Countdown from "@/components/Countdown";
import { useEffect } from "react";

export const PROMPT_DELAY = 5000;

export default function LobbiCoachApp() {
  const { loading, setAudioCallback } = useMicrophone();
  const {
    connect,
    disconnect,
    connecting,
    connected,
    resetTranscript,
    sendAudio,
    transcript,
  } = useTranscription();
  const { answers, willPromptIn, togglePaused, isPaused } = usePrompting({
    prompt: transcript,
    onPrompt: resetTranscript,
    promptDelay: PROMPT_DELAY,
  });

  const unMute = () => {
    connect();
  };

  const mute = () => {
    disconnect();
  };

  useEffect(() => {
    if (!connected) setAudioCallback(null);
    else setAudioCallback(sendAudio);
  }, [connected, sendAudio, setAudioCallback]);

  if (loading) return <MicPermissionModal />;

  return (
    <div className="h-full relative">
      {/* main window */}
      <div className="h-full pb-32 pt-4 flex flex-col px-4 overflow-y-scroll">
        {answers.map((a) => (
          <div key={a.createdAt} className="flex flex-col gap-y-2">
            <div className="ml-auto w-2/3 rounded-lg px-4 py-2 shadow bg-blue-400 text-white">
              {a.prompt}
            </div>
            {a.loading ? (
              <div className="italic text-sm">Thinking...</div>
            ) : (
              <div>{a.response}</div>
            )}
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="absolute bottom-0 right-0 left-0 bg-muted">
        <div className="px-4 absolute -top-6 left-0 right-0">
          <Countdown willPromptIn={willPromptIn} paused={isPaused} />
        </div>
        <div className="px-4 my-4">
          <Textarea
            className="text-lg px-2 py-1 w-full text-sm bg-muted shadow resize-none"
            value={transcript}
          />
        </div>
        <div className="flex justify-around px-4 my-4">
          <MicrophoneButton
            loading={connecting}
            muted={!connected}
            onMute={mute}
            onUnmute={unMute}
          />
          <Button
            disabled={willPromptIn === -1}
            className="p-4 rounded-full shadow-lg bg-muted"
            onClick={togglePaused}
          >
            {isPaused ? (
              <PlayIcon className="w-12 h-12" />
            ) : (
              <PauseIcon className="w-12 h-12" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
