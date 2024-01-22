import React, { useContext } from 'react'
import { WatchContext } from './WatchContext'
import "../styles/StopWatchButton.css"

export default function StopWatchButton() {
    const { isRunning, handleStart, handleStop, handleLap, handleReset } = useContext(WatchContext);

    return (
        <div>
            {/* Toggle between Start and Stop based on isRunning */}
            {isRunning 
                ? <button onClick={handleStop}>Stop</button> 
                : <button onClick={handleStart}>Start</button>
            }

            {/* Toggle between Lap and Reset based on isRunning */}
            {isRunning 
                ? <button onClick={handleLap}>Lap</button> 
                : <button onClick={handleReset}>Reset</button>
            }
        </div>
    );
}