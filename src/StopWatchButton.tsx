import React, { MouseEventHandler } from "react";

interface StopWatchButtonProps {
  isPaused: boolean;
  handleStartStop: MouseEventHandler<HTMLButtonElement>;
}

export default function StopWatchButton({
  isPaused,
  handleStartStop,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={handleStartStop}>{isPaused ? "Start" : "Stop"}</button>
    </div>
  );
}
