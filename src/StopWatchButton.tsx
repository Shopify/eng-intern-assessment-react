// Responsible for buttons

import React from 'react'
import './styles/StopWatchButton.css'

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
                <button onClick={runningHandler} className="stopwatchButton" id="stopButton">Stop</button>
                <button onClick={lapHandler} className="stopwatchButton">Lap</button>
            </div>
        )
    }
    return(
        <div>
            <button onClick={runningHandler} className="stopwatchButton" id="startButton">Start</button>
            <button onClick={resetHandler} className="stopwatchButton">Reset</button>
        </div>
    )
}