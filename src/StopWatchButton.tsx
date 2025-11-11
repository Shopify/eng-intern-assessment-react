import React from "react";

interface StopwatchButtonProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
}
export default function StopwatchButton({
  isRunning,
  onStart,
  onStop,
  onReset,
  onLap,
}: StopwatchButtonProps) {
  return (
    <div>
      <button onClick={onStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={onStop} disabled={!isRunning}>
        Stop
      </button>

      <button onClick={onReset} disabled={!isRunning}>
        Reset
      </button>

      <button onClick={onLap} disabled={!isRunning}>
        Lap
      </button>
    </div>
  );
}
