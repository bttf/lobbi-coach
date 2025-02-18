import LobbiCoachApp from "@/app/LobbiCoachApp";
export default function Home() {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* header */}
      <div className="p-4 shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-4 items-center">
            <img src="lobbi-logo.png" className="w-12 h-12 rounded-lg" />
            <div className="text-4xl font-semibold flex items-start gap-x-1">
              Lobbi Coach<span className="text-lg">™️</span>
            </div>
          </div>
          {/* TODO how-to modal */}
          {/*<InfoIcon className="w-6 h-6 text-gray-400" />*/}
        </div>
      </div>

      {/* body */}
      <div className="flex-1 min-h-0">
        <LobbiCoachApp />
      </div>
    </div>
  );
}
