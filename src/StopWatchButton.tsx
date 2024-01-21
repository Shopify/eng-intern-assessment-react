import React from 'react'

interface StopWatchButtonProps{
    timeElapsed: number;
    toggleStopwatch(): void;
    resetStopwatch(): void;
    addLap(time: number): void;
}

export default function StopWatchButton({ timeElapsed, toggleStopwatch, resetStopwatch, addLap }: StopWatchButtonProps) {
    return(
        <div>
            <button id="toggle-stopwatch" onClick={() => toggleStopwatch()}>Start</button>
            <button id="reset-stopwatch" onClick={() => resetStopwatch()}>Reset</button>
            <button id="lap-stopwatch" onClick={() => addLap(timeElapsed)}>Lap</button>
        </div>
    )
}