import { MicIcon, MicOffIcon } from "lucide-react";
import Button from "@/components/ui/Button";
export default function MicrophoneButton({
  onMute,
  onUnmute,
  muted,
}: {
  muted: boolean;
  onMute: () => void;
  onUnmute: () => void;
}) {
  return (
    <Button className="p-4 rounded-full">
      {muted ? (
        <MicOffIcon className="w-12 h-12 text-red-500" onClick={onUnmute} />
      ) : (
        <MicIcon className="w-12 h-12" onClick={onMute} />
      )}
    </Button>
  );
}
