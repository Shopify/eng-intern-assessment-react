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
      {!isRunning ? (
        <button onClick={onStart}>Start</button>
      ) : (
        <button onClick={onStop}>Stop</button>
      )}
      <button onClick={onReset}>Reset</button>
      {isRunning && <button onClick={onLap}>Lap</button>}
    </div>
  );
}
