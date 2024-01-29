import React from 'react';

/**
 * Interface to define types of stopwatch functions being passed as props
 */
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
  // When stopwatch is running, render Stop and Lap buttons
  if (isRunning) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onStop} style={{ fontSize: '1rem', backgroundColor: 'salmon', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Stop
          </button>
          <button onClick={onLap} style={{ fontSize: '1rem', backgroundColor: 'lightgray', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Lap
          </button>
        </div>
      </>
    )
  } else {
    // When stopwatch is paused/not running, render Start and Reset buttons
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onStart} style={{ fontSize: '1rem', backgroundColor: 'lightgreen', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Start
          </button>
          
          <button onClick={onReset} style={{ fontSize: '1rem', backgroundColor: 'salmon', width: '100px', height: '40px', border: 'none', outline: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Reset
          </button>
        </div>
      </>
    )
  }
}