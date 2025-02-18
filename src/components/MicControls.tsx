import MicrophoneButton from "@/components/MicrophoneButton";
import Textarea from "@/components/ui/Textarea";
import Countdown from "@/components/Countdown";
import Button from "@/components/ui/Button";
import { PlayIcon, PauseIcon } from "lucide-react";
export default function MicControls({
  loading,
  muted,
  onMute,
  onUnmute,
  togglePaused,
  paused,
  willPromptIn,
  transcript,
}: {
  loading: boolean;
  muted: boolean;
  onMute: () => void;
  onUnmute: () => void;
  togglePaused: () => void;
  paused: boolean;
  willPromptIn: number;
  transcript: string;
}) {
  const isPrompting = willPromptIn !== -1;
  return (
    <div className="absolute bottom-0 right-0 left-0 bg-background dark:bg-muted">
      {isPrompting && (
        <div className="px-4 my-2">
          <Countdown willPromptIn={willPromptIn} paused={paused} />
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
          loading={loading}
          muted={muted}
          onMute={onMute}
          onUnmute={onUnmute}
        />
        <Button
          disabled={!isPrompting}
          className="p-4 rounded-full shadow-lg bg-muted"
          onClick={isPrompting ? togglePaused : () => {}}
        >
          {paused ? (
            <PlayIcon className="w-12 h-12" />
          ) : (
            <PauseIcon className="w-12 h-12" />
          )}
        </Button>
      </div>
    </div>
  );
}
