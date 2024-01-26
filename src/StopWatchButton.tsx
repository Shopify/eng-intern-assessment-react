import React from 'react'
type Props = {
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
  }: Props) {
    return (
      <div>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
        <button onClick={onReset}>Reset</button>
        <button onClick={onLap}>Lap</button>
      </div>
    );
  }