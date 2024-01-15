import React, { MouseEventHandler } from "react";

interface StopWatchButtonProps {
  isPaused: boolean;
  handleStartStop: MouseEventHandler<HTMLButtonElement>;
  handleReset: MouseEventHandler<HTMLButtonElement>;
  handleLap: MouseEventHandler<HTMLButtonElement>;
}

export default function StopWatchButton({
  isPaused,
  handleStartStop,
  handleReset,
  handleLap,
}: StopWatchButtonProps) {
  return (
    <div>
      <button
        onClick={handleStartStop}
        style={{
          backgroundColor: isPaused ? "green" : "red",
          color: "white",
          borderColor: "black",
        }}
      >
        {isPaused ? "Start" : "Stop"}
      </button>
      <button
        onClick={isPaused ? handleReset : handleLap}
        style={{
          backgroundColor: "white",
          color: "black",
          borderColor: "black",
        }}
      >
        {isPaused ? "Reset" : "Lap"}
      </button>
    </div>
  );
}
