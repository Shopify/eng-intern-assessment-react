import React from 'react'

// Define the prop types for the StopWatchButton component
interface StopWatchButtonProps {
    timerOn: boolean;
    isPaused: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handlePause: () => void;
    handleResume: () => void;
    handleReset: () => void;
    handleLap: () => void;
}

// StopWatchButton component for the stop, start, reset and lap buttons
export default function StopWatchButton({ timerOn, isPaused, handleStart, handleStop, handlePause, handleResume, handleReset, handleLap }: StopWatchButtonProps) {
    return(
        <div>
            {!timerOn && <button className="stopwatch-button" onClick={handleStart}>Start</button>}
            {timerOn && !isPaused && <button className="stopwatch-button" onClick={handlePause}>Pause</button>}
            {timerOn && isPaused && <button className="stopwatch-button" onClick={handleResume}>Resume</button>}
            {timerOn && <button className="stopwatch-button" onClick={handleStop}>Stop</button>}
            <button className="stopwatch-button" onClick={handleReset}>Reset</button>
            {timerOn && <button className="stopwatch-button" onClick={handleLap}>Lap</button>}
        </div>
    )
}