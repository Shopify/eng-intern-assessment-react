// Responsible for buttons

import React from 'react'

interface Props {
    isRunning: Boolean
    runningHandler: () => void,
    resetHandler: () => void,
    lapHandler: () => void
}

export default function StopWatchButton({isRunning, runningHandler, resetHandler, lapHandler}:Props) {


    if (isRunning) {
        
        return (
            <div>
                <button onClick={runningHandler}>Stop</button>
                <button onClick={lapHandler}>Lap</button>
            </div>
        )
    }
    return(
        <div>
            <button onClick={runningHandler}>Start</button>
            <button onClick={resetHandler}>Reset</button>
        </div>
    )
}