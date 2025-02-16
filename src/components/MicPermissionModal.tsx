import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { MicIcon } from "lucide-react";
export default function MicPermissionModal({
  requestPermission,
}: {
  requestPermission: () => void;
}) {
  return (
    <Modal open title="Microphone permission">
      <div>Please allow Lobbi Coach to access your microphone.</div>
      <div className="flex justify-center">
        <Button
          className="px-4 py-2 w-fit rounded shadow text-lg bg-green-500 text-white font-semibold"
          onClick={requestPermission}
        >
          <MicIcon className="w-6 h-6" />
          Grant permission
        </Button>
      </div>
    </Modal>
  );
}
