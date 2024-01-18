// A separate component that represents the start, stop, and reset buttons.

import React from 'react'

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

export function StartButtonComponent({ setCounting }: StartStopButtonProps) {
    return(
        <div>
            <button onClick={() => setCounting(true)}>Start</button>
        </div>
    )
}

export function StopButtonComponent({ setCounting }: StartStopButtonProps) {
    return(
        <div>
            <button onClick={() => setCounting(false)}>Stop</button>
        </div>
    )
}

export function LapButtonComponent({ onLap }: LapButtonProps) {
    return(
        <div>
            <button onClick={onLap}>Lap</button>
        </div>
    )
}

export function ResetButtonComponent({ setTime, setLaps }: ResetButtonProps) {
    return(
        <div>
            <button onClick={() => {setTime(0); setLaps([])}}>Reset</button>
        </div>
    )
}