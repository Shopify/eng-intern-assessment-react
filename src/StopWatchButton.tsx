import React from 'react';

interface StopWatchButtonProps {
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
  isRunning: boolean;
}

export default function StopWatchButton({
  onStart,
  onStop,
  onReset,
  onLap,
  isRunning,
}: StopWatchButtonProps) {
  if (isRunning) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onStop} style={{ fontSize: '1rem', backgroundColor: 'salmon', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px' }}>
            Stop
          </button>
          <button onClick={onLap} style={{ fontSize: '1rem', backgroundColor: 'lightgray', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px' }}>
            Lap
          </button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onStart} style={{ fontSize: '1rem', backgroundColor: 'lightgreen', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px' }}>
            Start
          </button>
          
          <button onClick={onReset} style={{ fontSize: '1rem', backgroundColor: 'salmon', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px' }}>
            Reset
          </button>
        </div>
      </>
    )
  }
}