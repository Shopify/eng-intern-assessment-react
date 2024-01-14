import React from 'react';

type StopWatchButtonProps = {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
