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
            {/* Start/Pause button */}
            <button 
                className={`custom-button ${props.isPaused ? 'start-button' : 'pause-button'}` }
                onClick={props.handleStartPause}
                aria-label={props.isPaused ? "Start" : "Pause"}
            >{props.isPaused? "Start": "Pause"}</button>
            {/* Reset button */}
            <button 
                className="custom-button reset-button" 
                onClick={props.handleReset}
                aria-label="Reset"
            >Reset</button>
            {/* Lap button */}
            <button 
                className="custom-button lap-button" 
                onClick={props.handleLap}
                aria-label="Lap"
            >Lap</button>
        </div>
    )
}