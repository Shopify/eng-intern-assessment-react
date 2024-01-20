// Responsible for buttons

import React from 'react'
import '../styles/StopWatchButton.css'
interface Props {
    isRunning: Boolean
    runningHandler: () => void,
    resetHandler: () => void,
    lapHandler: () => void
}

export default function StopWatchButton({isRunning, runningHandler, resetHandler, lapHandler}:Props) {

    const getColor = () => {
        if (isRunning) {
            return 'red';
        }

        return 'green';
    }
    return(
        <div>
            <button onClick={runningHandler} className="stopStartButton" style={{backgroundColor: getColor()}}>{ isRunning ? 'Stop' : 'Start'}</button>
            <button onClick={isRunning ? lapHandler : resetHandler}>{ isRunning ? 'Lap' : 'Reset'}</button>
        </div>
    )
}