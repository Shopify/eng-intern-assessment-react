import React from 'react';

type StopWatchButtonProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

export default function StopWatchButton({
  isRunning,
  onStart,
  onStop,
  onReset,
  onLap,
}: StopWatchButtonProps) {
  return (
    <div className="button-container">
      {isRunning ? (
        <>
          <button className="button-stop" onClick={onStop}>
            Stop
          </button>
          <button onClick={onLap}>Lap</button>
        </>
      ) : (
        <>
          <button className="button-start" onClick={onStart}>
            Start
          </button>
          <button onClick={onReset}>Reset</button>
        </>
      )}
    </div>
  );
}
