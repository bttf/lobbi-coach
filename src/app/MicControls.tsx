"use client";
import useMicrophone from "@/app/useMicrophone";
import useTranscription from "@/app/useTranscription";
export default function MicControls() {
  const {
    loading,
    hasPermission,
    requestPermission,
    isRecording,
    startRecording,
    stopRecording,
  } = useMicrophone();
  const { sendAudio, transcript } = useTranscription();
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

      <div>{transcript}</div>
    </div>
  );
}
