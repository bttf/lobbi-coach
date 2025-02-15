import MicControls from "@/app/MicControls";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto flex items-center h-full">
      <div className="flex flex-col justify-around gap-y-8">
        <div className="flex items-center gap-x-4">
          <img src="lobbi-logo.png" className="w-12 h-12 rounded-lg" />
          <div className="text-4xl font-semibold flex items-start gap-x-1">
            Lobbi Coach<span className="text-lg">™️</span>
          </div>
        </div>
        <div>
          <MicControls />
        </div>
      </div>
    </div>
  );
}
