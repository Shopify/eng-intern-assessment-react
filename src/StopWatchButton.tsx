import React from 'react'
interface StopWatchButtonProps {
    handleStartPause: () => void;
    handleReset: () => void;
    handleLap: () => void;
    isPaused: boolean;
}

// This the the stop watch button, where we can start/stop/reset time and record laps
export default function StopWatchButton(props:StopWatchButtonProps) {
    return(
        <div className="Control-Buttons">
            <button onClick={props.handleStartPause}>{props.isPaused? "Start": "Pause"}</button>
            <button onClick={props.handleReset}>Reset</button>
            <button onClick={props.handleLap}>Lap</button>
        </div>
    )
}