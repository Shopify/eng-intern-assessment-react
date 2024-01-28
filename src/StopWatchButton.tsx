import React from 'react'

export interface StopWatchButtonInterface {
    isRunning: boolean
    setIsRunning(value: boolean): void
}

export default function StopWatchButton({ isRunning, setIsRunning }: StopWatchButtonInterface) {
    return(
        <button className="stopwatch-button" onClick={(e) => setIsRunning(!isRunning)}>
            {isRunning ? 'Stop' : 'Start'}
        </button>
    )
}