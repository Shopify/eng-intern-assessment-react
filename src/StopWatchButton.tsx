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
    <div className="button-container">
      <button className="button-start" onClick={onStart}>
        Start
      </button>
      <button className="button-stop" onClick={onStop}>
        Stop
      </button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onLap}>Lap</button>
    </div>
  );
}
