import React from "react";

interface StopWatchButtonProps {
  isRunning: boolean;
  onStartStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

/**
 * Props:
 * - `isRunning`: A boolean indicating if the stopwatch is active.
 * - `onStartStop`: A function triggered on start/stop button click.
 * - `onReset`: A function triggered on reset button click.
 * - `onLap`: A function triggered on lap button click.
 */
const StopWatchButton = ({
  isRunning,
  onStartStop,
  onReset,
  onLap,
}: StopWatchButtonProps) => {
  return (
    <div>
      <button onClick={onStartStop}>{isRunning ? "Stop" : "Start"}</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onLap} disabled={!isRunning}>
        Lap
      </button>
    </div>
  );
};

export default StopWatchButton;
