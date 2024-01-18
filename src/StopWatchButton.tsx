// A separate component that represents the start, stop, and reset buttons.

import React from 'react'

type ButtonProps = {
    setCounting: (counting: boolean) => void;
    setTime: (time: number) => void;
};

export function StartButtonComponent({ setCounting }: ButtonProps) {
    return(
        <div>
            <button onClick={() => setCounting(true)}>Start</button>
        </div>
    )
}

export function StopButtonComponent({ setCounting }: ButtonProps) {
    return(
        <div>
            <button onClick={() => setCounting(false)}>Stop</button>
        </div>
    )
}

export function LapButtonComponent({ setCounting }: ButtonProps) {
    return(
        <div>
            <button onClick={() => setCounting(true)}>Lap</button>
        </div>
    )
}

export function ResetButtonComponent({ setTime }: ButtonProps) {
    return(
        <div>
            <button onClick={() => setTime(0)}>Reset</button>
        </div>
    )
}