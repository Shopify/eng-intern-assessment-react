import React from 'react';
import '../assets/css/StopWatchButton.css';

type StopWatchButtonProps = {
    isRunningHandler: () => void,
    lapsHandler: () => void,
    resetHandler: () => void,
    isRunning: boolean
}

export default function StopWatchButton({ isRunningHandler, lapsHandler, resetHandler, isRunning }: StopWatchButtonProps) {
    return (
        <div className="button-container">
            <button className="button lapReset" onClick={isRunning ? lapsHandler : resetHandler}>
                {isRunning ? "Lap" : "Reset"}
            </button>
            <button className={isRunning ? "button stop" : "button start"} onClick={isRunningHandler}>
                {isRunning ? "Stop" : "Start"}
            </button>
        </div>
    )
}