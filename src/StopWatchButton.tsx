import React from 'react'

type StopWatchButtonProps = {
    isRunning: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLap: () => void;
}

// represents the start, stop, lap, and reset buttons
export default function StopWatchButton({
    isRunning,
    handleStart,
    handleStop,
    handleReset,
    handleLap,
}: StopWatchButtonProps) {
    return(
        <div>
            <>
                {isRunning ? (
                    <button onClick={handleLap}>Lap</button>
                ):(
                    <button onClick={handleReset}>Reset</button>
                )}
            </>
            <>
                {isRunning ? (
                    <button onClick={handleStop}>Stop</button>
                ):(
                    <button onClick={handleStart}>Start</button>
                )}
            </>
        </div>
    )
}