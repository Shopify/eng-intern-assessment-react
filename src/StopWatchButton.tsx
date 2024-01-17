import React from 'react';

interface StopWatchButtonProps {
  isLive: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
}

export default function StopWatchButton({
  isLive,
  onStart,
  onStop,
  onReset,
  onLap,
}: StopWatchButtonProps) {
  return (
    <div>
      <button onClick={isLive ? onStop : onStart}>
        {isLive ? 'Stop' : 'Start'}
      </button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onLap} disabled={!isLive}>
        Lap
      </button>
    </div>
  );
}
