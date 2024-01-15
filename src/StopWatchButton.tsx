import React, { MouseEventHandler } from "react";

// CSS Style for buttons
const buttonStyle: Object = {
  borderColor: "black",
  fontWeight: "bold",
  fontSize: "24px",
};

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
          ...buttonStyle,
          backgroundColor: isPaused ? "green" : "red",
          color: "white",
        }}
      >
        {isPaused ? "Start" : "Stop"}
      </button>
      <button
        onClick={isPaused ? handleReset : handleLap}
        style={{
          ...buttonStyle,
          backgroundColor: "white",
          color: "black",
        }}
      >
        {isPaused ? "Reset" : "Lap"}
      </button>
    </div>
  );
}
