import MicrophoneButton from "@/components/MicrophoneButton";
import Button from "@/components/ui/Button";
import { PlayIcon, PauseIcon } from "lucide-react";
export default function MicControls({
  loading,
  muted,
  onMute,
  onUnmute,
  canPause,
  togglePaused,
  paused,
}: {
  loading: boolean;
  muted: boolean;
  onMute: () => void;
  onUnmute: () => void;
  canPause: boolean;
  togglePaused: () => void;
  paused: boolean;
}) {
  return (
    <div className="flex justify-around px-4 my-4">
      <MicrophoneButton
        loading={loading}
        muted={muted}
        onMute={onMute}
        onUnmute={onUnmute}
      />
      <Button
        disabled={!canPause}
        className="p-4 rounded-full shadow-lg bg-muted"
        onClick={canPause ? togglePaused : () => {}}
      >
        {paused ? (
          <PlayIcon className="w-12 h-12" />
        ) : (
          <PauseIcon className="w-12 h-12" />
        )}
      </Button>
    </div>
  );
}
