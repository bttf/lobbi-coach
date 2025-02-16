"use client";
import Countdown from "@/app/Countdown";
import useMicrophone from "@/app/useMicrophone";
import usePrompting from "@/app/usePrompting";
import useTranscription from "@/app/useTranscription";

export const PROMPT_DELAY = 5000;

export default function MicControls() {
  const {
    loading,
    hasPermission,
    requestPermission,
    isRecording,
    startRecording,
    stopRecording,
  } = useMicrophone();
  const { sendAudio, transcript, reset } = useTranscription();
  const { answers, willPromptIn } = usePrompting({
    prompt: transcript,
    onPrompt: () => {
      reset();
    },
    promptDelay: PROMPT_DELAY,
  });
  console.log("will prompt in...", willPromptIn);
  if (loading) return <>Loading...</>;
  return (
    <div className="flex flex-col gap-y-2">
      <div className="text-sm font-semibold">Mic Controls</div>

      <div>{hasPermission ? "Has permission" : "Does not have permission"}</div>

      {hasPermission &&
        (isRecording ? (
          <div className="flex items-center gap-x-4">
            <button
              className="px-2 py-1 w-fit bg-red-500 rounded shadow text-sm"
              onClick={stopRecording}
            >
              Stop recording
            </button>
            <button onClick={reset}>reset transcript</button>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <button
              className="px-2 py-1 w-fit bg-green-500 rounded shadow text-sm"
              onClick={() => startRecording((data) => sendAudio(data))}
            >
              Start recording
            </button>
          </div>
        ))}

      {!hasPermission && (
        <button
          className="px-2 py-1 w-fit bg-gray-300 rounded shadow text-sm"
          onClick={requestPermission}
        >
          Grant microphone permission
        </button>
      )}

      <Countdown prompt={transcript} promptDelay={PROMPT_DELAY} />

      <div>{transcript}</div>
    </div>
  );
}
