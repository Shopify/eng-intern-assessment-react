import React from 'react'

interface StopWatchButtonProps {
    timerOn: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLap: () => void;
}

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