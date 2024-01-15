// Responsible for buttons

import React from 'react'

interface Props {
    isRunning: Boolean
    runningHandler: () => void,
    resetHandler: () => void
}

export default function StopWatchButton({isRunning, runningHandler, resetHandler}:Props) {


    if (isRunning) {
        
        return (
            <div>
                <button onClick={runningHandler}>Stop</button>
                <button>Lap</button>
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