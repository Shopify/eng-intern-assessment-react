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
        <div className='button-container'>
            <>
                {isRunning ? (
                    <button className='button-lap' onClick={handleLap}>Lap</button>
                ):(
                    <button className='button-reset' onClick={handleReset}>Reset</button>
                )}
            </>
            <>
                {isRunning ? (
                    <button className='button-stop' onClick={handleStop}>Stop</button>
                ):(
                    <button className='button-start' onClick={handleStart}>Start</button>
                )}
            </>
        </div>
    )
}