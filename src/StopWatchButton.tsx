import React from 'react'

// Define the prop types for the StopWatchButton component
interface StopWatchButtonProps {
    timerOn: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLap: () => void;
}

// StopWatchButton component for the stop, start, reset and lap buttons
export default function StopWatchButton({ timerOn, handleStart, handleStop, handleReset, handleLap }: StopWatchButtonProps) {
    return(
        <div>
            {!timerOn && <button className="stopwatch-button" onClick={handleStart}>Start</button>}
            {timerOn && <button className="stopwatch-button" onClick={handleStop}>Stop</button>}
            <button className="stopwatch-button" onClick={handleReset}>Reset</button>
            <button className="stopwatch-button" onClick={handleLap}>Lap</button>

        </div>
    )
}