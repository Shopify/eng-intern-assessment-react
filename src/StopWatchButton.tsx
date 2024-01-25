import React from 'react';

interface StopWatchButtonProps {
    onStart: () => void,
    onStop: () => void,
    onReset: () => void,
    onLap: () => void,
    isRunning: boolean,
}

export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
  onLap,
  isRunning,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={isRunning ? onStop : onStart}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={onReset} disabled={isRunning}>
        Reset
      </button>
      <button onClick={onLap} disabled={!isRunning}>
        Lap
      </button>
    </div>
  );
}
