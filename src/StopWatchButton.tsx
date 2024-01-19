import React from 'react';

export interface StopWatchButtonProps {
  onResume: () => void;
  onPause: () => void;
  onReset: () => void;
  onLap: () => void;
}

export default function StopWatchButton({
  onResume,
  onPause,
  onReset,
  onLap,
}: StopWatchButtonProps) {
  return (
    <>
      <button type="button" onClick={onResume}>
        Resume
      </button>
      <button type="button" onClick={onPause}>
        Pause
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onLap}>
        Lap
      </button>
    </>
  );
}
