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
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
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
      {/* Lap button */}
      <button
        onClick={handleLap}
        style={{
          ...buttonStyle,
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Lap
      </button>
      {/* Reset button */}
      <button
        onClick={handleReset}
        style={{
          ...buttonStyle,
          backgroundColor: "white",
          color: "black",
        }}
      >
        Reset
      </button>
    </div>
  );
}
