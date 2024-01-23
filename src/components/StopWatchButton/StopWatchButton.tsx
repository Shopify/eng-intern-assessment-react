import React from "react";

type StopWatchButtonProps = {
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
  handleLap: () => void;
  isStopWatchActive: boolean;
};

export function StopWatchButton({
  isStopWatchActive = false,
  handleStart,
  handleStop,
  handleReset,
  handleLap,
}: StopWatchButtonProps) {
  return (
    <div>
      <button disabled={isStopWatchActive} onClick={handleStart}>
        Start
      </button>
      <button disabled={!isStopWatchActive} onClick={handleStop}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap}>Lap</button>
    </div>
  );
}
