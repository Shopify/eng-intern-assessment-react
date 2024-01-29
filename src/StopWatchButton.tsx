import React, { useState } from "react";
import { start } from "repl";

type StopWatchButtonProps = {
  isRunning: boolean;
  reset: () => void;
  lap: () => void;
  start: () => void;
  stop: () => void;
};

export default function StopWatchButton({
  isRunning,
  reset,
  lap,
  stop,
  start,
}: StopWatchButtonProps) {
  /**
   * Handler for calling start or stop depending on if stopwatch is running
   */
  const handleStartStopClick = () => {
    if (isRunning) {
      stop();
    } else {
      start();
    }
  };

  /**
   * Handler for calling lap or reset depending on if stopwatch is running
   */
  const handleLapResetClick = () => {
    if (isRunning) {
      lap();
    } else {
      reset();
    }
  };

  return (
    <div className="button-container">
      <button onClick={handleLapResetClick}>
        {isRunning ? "Lap" : "Reset"}
      </button>
      <button onClick={handleStartStopClick}>
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
}
