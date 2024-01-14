import React from 'react';

type StopWatchButtonProps = {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
  onLap,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onLap}>Lap</button>
    </div>
  );
}
