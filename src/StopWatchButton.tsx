import React from 'react'

// this component focuses on rendering the buttons, given the current state of whether stopwatch is running/not running.
export default function StopWatchButton({
    isRunning,
    onStart,
    onStop,
    onReset,
    onLap,
  }: {
    isRunning: boolean;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
  }) {
    return (
        <div>
            <button onClick={isRunning ? onStop : onStart}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={onLap} disabled={!isRunning}>
            Lap
            </button>
            <button onClick={onReset}>Reset</button>
        </div>
    );
}