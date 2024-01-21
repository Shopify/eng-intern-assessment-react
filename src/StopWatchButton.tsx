import React from 'react'

// Interface to assign types to the props of the component StopWatchButton
interface StopWatchButtonProps{
    timeElapsed: number;
    toggleStopwatch(): void;
    resetStopwatch(): void;
    addLap(time: number): void;
}

// Component that renders the buttons aspect of the StopWatch
// Has 3 buttons for reseting, starting/stopping, and to keep track of laps
export default function StopWatchButton({ timeElapsed, toggleStopwatch, resetStopwatch, addLap }: StopWatchButtonProps) {
    return(
        <div>
            <button id="reset-stopwatch" onClick={() => resetStopwatch()}>Reset</button>
            <button id="toggle-stopwatch" onClick={() => toggleStopwatch()}>Start</button>
            <button id="lap-stopwatch" onClick={() => addLap(timeElapsed)}>Lap</button>
        </div>
    )
}