import { EllipsisIcon, MicIcon, MicOffIcon } from "lucide-react";
import Button from "@/components/ui/Button";
export default function MicrophoneButton({
  onMute,
  onUnmute,
  loading,
  muted,
}: {
  muted: boolean;
  onMute: () => void;
  onUnmute: () => void;
  loading: boolean;
}) {
  return (
    <Button className="p-4 rounded-full shadow-lg bg-muted">
      {loading && <EllipsisIcon className="w-12 h-12 text-blue-500" />}
      {!loading && muted && (
        <MicOffIcon className="w-12 h-12 text-red-500" onClick={onUnmute} />
      )}
      {!loading && !muted && <MicIcon className="w-12 h-12" onClick={onMute} />}
    </Button>
  );
}
