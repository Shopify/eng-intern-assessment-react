import React from 'react';

interface StopWatchButtonProps {
    handleStartPause: () => void;
    handleReset: () => void;
    handleLap: () => void;
    isPaused: boolean;
}

// This the the stop watch button, where we can start/stop/reset time and record laps
export default function StopWatchButton(props:StopWatchButtonProps) {
    return(
        <div className='custom-button-container'>
            <button className="custom-button" style={{backgroundColor: props.isPaused? "green": "orange"}} onClick={props.handleStartPause}>{props.isPaused? "Start": "Pause"}</button>
            <button className="custom-button" style={{backgroundColor: "red"}} onClick={props.handleReset}>Reset</button>
            <button className="custom-button" style={{backgroundColor: "blue"}} onClick={props.handleLap}>Lap</button>
        </div>
    )
}