import React, { MouseEventHandler } from "react";

// Props interface for StopWatchButton component
interface StopWatchButtonProps {
  isPaused: boolean;
  handleStartStop: MouseEventHandler<HTMLButtonElement>; // Click handler for Stop/Start button
  handleReset: MouseEventHandler<HTMLButtonElement>; // Click handler for Reset button
  handleLap: MouseEventHandler<HTMLButtonElement>; // Click handler for Lap button
}

export default function StopWatchButton({
  isPaused,
  handleStartStop,
  handleReset,
  handleLap,
}: StopWatchButtonProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
        height: "48px",
      }}
    >
      {/* Start/Stop button (swithces depending on whether time is paused or not)*/}
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
