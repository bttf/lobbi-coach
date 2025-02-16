"use client";

import { useEffect, useState } from "react";

let intervalHandler: NodeJS.Timeout | null = null;

export default function Countdown({
  prompt,
  promptDelay,
}: {
  prompt: string;
  promptDelay: number;
}) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (intervalHandler) clearInterval(intervalHandler);
    if (!prompt) setProgress(0);
    else {
      setProgress(100);
      intervalHandler = setInterval(() => {
        setProgress((prev) => prev - (50 / promptDelay) * 100);
      }, 50);
    }
  }, [prompt, promptDelay]);

  const radius = 45;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <div className="relative">
      <svg
        className="transform -rotate-90"
        height={radius * 2}
        width={radius * 2}
      >
        {/* Background circle */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke="#3b82f6"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Percentage text in the middle */}
      {/*
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold">{Math.round(progress)}%</span>
      </div>
      */}
    </div>
  );
}
