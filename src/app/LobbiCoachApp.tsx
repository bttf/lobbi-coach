"use client";
import useMicrophone from "@/lib/hooks/useMicrophone";
import usePrompting from "@/lib/hooks/usePrompting";
import useTranscription from "@/lib/hooks/useTranscription";
import MicPermissionModal from "@/components/MicPermissionModal";
import { useEffect } from "react";
import Conversation from "@/components/Conversation";
import MicControls from "@/components/MicControls";

/** TODO
 * - add supabase
 * - add game search
 * - select a game to see controls
 * - persist selected game to DB
 */

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
      <Conversation answers={answers} />
      <MicControls
        loading={connecting}
        muted={!connected}
        onMute={disconnect}
        onUnmute={connect}
        togglePaused={togglePaused}
        paused={isPaused}
        willPromptIn={willPromptIn}
        transcript={transcript}
      />
    </div>
  );
}
