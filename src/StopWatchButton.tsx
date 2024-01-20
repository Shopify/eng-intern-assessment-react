import React from "react";

interface StopWatchButtonProps {
  running: boolean;
  handleStartAndStop: () => void;
  handleReset: () => void;
  handleLap: () => void;
}

export default function StopWatchButton({
  running,
  handleStartAndStop,
  handleReset,
  handleLap,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={handleStartAndStop}>{running ? "Stop" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap}>Lap</button>
    </div>
  );
}
