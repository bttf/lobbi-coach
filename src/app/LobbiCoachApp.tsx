"use client";
import { MicOffIcon, PauseIcon, PlayIcon } from "lucide-react";
import useMicrophone from "@/lib/hooks/useMicrophone";
import usePrompting from "@/lib/hooks/usePrompting";
import useTranscription from "@/lib/hooks/useTranscription";
import Button from "@/components/ui/Button";
import MicPermissionModal from "@/components/MicPermissionModal";
import MicrophoneButton from "@/components/MicrophoneButton";
import Textarea from "@/components/ui/Textarea";
import Countdown from "@/components/Countdown";

export const PROMPT_DELAY = 5000;

const Skeleton = () => (
  <div className="h-full relative animate-pulse">
    {/* controls */}
    <div className="absolute bottom-0 right-0 left-0 p-4 flex justify-around border-t rounded-t-lg">
      <Button className="p-4 rounded-full">
        <MicOffIcon className="w-12 h-12 text-gray-400" />
      </Button>
      <Button className="p-4 rounded-full">
        <PauseIcon className="w-12 h-12 text-gray-400" />
      </Button>
    </div>
  </div>
);

export default function LobbiCoachApp() {
  const { sendAudio, transcript, reset, setTranscript } = useTranscription();
  const {
    loading,
    hasPermission,
    requestPermission,
    isRecording,
    startRecording,
    stopRecording,
  } = useMicrophone({
    onAudio: (data) => sendAudio(data),
  });
  const { answers, willPromptIn, togglePaused, isPaused } = usePrompting({
    prompt: transcript,
    onPrompt: reset,
    promptDelay: PROMPT_DELAY,
  });

  if (loading || !hasPermission)
    return (
      <>
        {!hasPermission && (
          <MicPermissionModal requestPermission={requestPermission} />
        )}
        <Skeleton />
      </>
    );

  return (
    <div className="h-full relative">
      {/* main window */}
      <div className="h-full pb-32 pt-4 flex flex-col px-4">
        {answers.map((a) => (
          <div key={a.createdAt} className="flex flex-col gap-y-2">
            <div className="ml-auto w-2/3 rounded-lg px-4 py-2 shadow bg-blue-400 text-white">
              {a.prompt}
            </div>
            <div>{a.response}</div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="absolute bottom-0 right-0 left-0 border-t">
        <div className="px-4 absolute -top-6 left-0 right-0">
          <Countdown willPromptIn={willPromptIn} paused={isPaused} />
        </div>
        <div className="px-4 my-4">
          <Textarea
            className="text-lg border px-2 py-1 w-full text-sm"
            value={transcript}
            onChange={setTranscript}
          />
        </div>
        <div className="flex justify-around px-4 my-4">
          <MicrophoneButton
            muted={!isRecording}
            onMute={stopRecording}
            onUnmute={startRecording}
          />
          <Button
            disabled={willPromptIn === -1}
            className="p-4 rounded-full"
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
