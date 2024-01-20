import React from "react";

/**
 * A component that contatins the three buttons of the stopwatch
 */

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
      {/* Display Stop if the stopwatch is running and Start otherwise */}
      <button onClick={handleStartAndStop}>{running ? "Stop" : "Start"}</button>
      {/* Stop the stopwatch if runing and reset the stopwatch and laps records */}
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap}>Lap</button>
    </div>
  );
}
