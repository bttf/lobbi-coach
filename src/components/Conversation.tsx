"use client";
import { useEffect, useRef } from "react";

import { Answer } from "@/lib/hooks/usePrompting";

export default function Conversation({ answers }: { answers: Answer[] }) {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!answers.length) return;
    if (!lastMessageRef.current) return;
    lastMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [answers]);
  return (
    <div className="h-full px-4 pb-32 pt-2 flex flex-col overflow-y-scroll smooth-scroll">
      {answers.map((a) => (
        <div key={a.createdAt} className="flex flex-col gap-y-2">
          <div className="ml-auto w-2/3 rounded-lg px-4 py-2 shadow bg-blue-400 text-white">
            {a.prompt}
          </div>
          {a.loading ? (
            <div className="italic text-sm">Thinking...</div>
          ) : (
            <div>{a.response}</div>
          )}
        </div>
      ))}
      <div ref={lastMessageRef} className="scroll-mb-32"></div>
    </div>
  );
}
