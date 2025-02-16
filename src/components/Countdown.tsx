"use client";

import Progress from "@/components/ui/Progress";
import { useEffect, useState } from "react";

let intervalHandler: NodeJS.Timeout | null = null;

export const COUNTDOWN_FROM = 3000;

export default function Countdown({
  willPromptIn,
  paused,
}: {
  willPromptIn: number;
  paused: boolean;
}) {
  const [progress, setProgress] = useState(100);
  useEffect(() => {
    if (intervalHandler) clearInterval(intervalHandler);

    if (willPromptIn > COUNTDOWN_FROM) {
      setProgress(100);
      return;
    }

    if (willPromptIn === -1) setProgress(100);
    else if (paused && intervalHandler) {
      clearInterval(intervalHandler);
    } else {
      setProgress(
        (prev) => prev - (COUNTDOWN_FROM - willPromptIn) / COUNTDOWN_FROM
      );
      intervalHandler = setInterval(() => {
        setProgress((prev) => prev - (50 / COUNTDOWN_FROM) * 100);
      }, 50);
    }
  }, [willPromptIn, paused]);
  if (willPromptIn === -1) return null;
  if (willPromptIn > COUNTDOWN_FROM) return null;
  return <Progress value={progress} />;
}
