// Represents the start, stop, lap, and reset buttons.

import React from 'react'

// Types for the button props
type StartStopButtonProps = {
    setCounting: (counting: boolean) => void;
};

type LapButtonProps = {
    onLap: () => void;
};

type ResetButtonProps = {
    setTime: (time: number) => void;
    setLaps: (laps: number[]) => void;
};

// Start button, sets stopwatch counting to true
export function StartButtonComponent({ setCounting }: StartStopButtonProps) {
    return <div><button onClick={() => setCounting(true)}>Start</button></div>;
}

// Stop button, sets stopwatch counting to false
export function StopButtonComponent({ setCounting }: StartStopButtonProps) {
    return <div><button onClick={() => setCounting(false)}>Stop</button></div>;
}

// Lap button to record the current time
export function LapButtonComponent({ onLap }: LapButtonProps) {
    return <div><button onClick={onLap}>Lap</button></div>;
}

// Reset button, resets time and laps to their initial states
export function ResetButtonComponent({ setTime, setLaps }: ResetButtonProps) {
    return <div><button onClick={() => {setTime(0); setLaps([])}}>Reset</button></div>;
}
