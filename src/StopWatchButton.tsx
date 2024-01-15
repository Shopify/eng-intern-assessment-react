import React, { MouseEventHandler } from "react";

interface StopWatchButtonProps {
  isPaused: boolean;
  handleStartStop: MouseEventHandler<HTMLButtonElement>;
  handleReset: MouseEventHandler<HTMLButtonElement>;
}

export default function StopWatchButton({
  isPaused,
  handleStartStop,
  handleReset,
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
        onClick={isPaused ? handleReset : null}
        style={{
          backgroundColor: "white",
          color: "black",
          borderColor: "black",
        }}
      >
        {isPaused ? "Reset" : "Laps"}
      </button>
    </div>
  );
}
