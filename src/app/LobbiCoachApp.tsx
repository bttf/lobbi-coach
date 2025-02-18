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
import Conversation from "@/components/Conversation";

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

  useEffect(() => {
    if (!connected) setAudioCallback(null);
    else setAudioCallback(sendAudio);
  }, [connected, sendAudio, setAudioCallback]);

  if (loading) return <MicPermissionModal />;

  return (
    <div className="h-full relative">
      {/* main window */}
      <Conversation answers={answers} />

      {/* controls */}
      <div className="absolute bottom-0 right-0 left-0 bg-background dark:bg-muted">
        {willPromptIn !== -1 && (
          <div className="px-4 my-2">
            <Countdown willPromptIn={willPromptIn} paused={isPaused} />
          </div>
        )}
        {transcript && (
          <div className="px-4 mb-4 mt-2">
            <Textarea
              className="text-lg px-2 py-1 w-full text-sm dark:bg-muted shadow-inner resize-none"
              value={transcript}
            />
          </div>
        )}
        <div className="flex justify-around px-4 my-4">
          <MicrophoneButton
            loading={connecting}
            muted={!connected}
            onMute={disconnect}
            onUnmute={connect}
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
