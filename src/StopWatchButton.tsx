import React from 'react'
import './StopWatchButton.css'

type StopWatchButtonProps = {
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
}

export default function StopWatchButton({ onStart, onStop, onReset, onLap}: StopWatchButtonProps) {
    return (
        <div className = "button-container">
            <div className= "button-row">
                <button className= 'start_button' onClick={onStart}>Start</button>
                <button className= 'stop_button' onClick={onStop}>Stop</button>
                <button className= 'reset_button' onClick={onReset}>Reset</button>
                <button className= 'lap_button' onClick={onLap}>Lap</button>
            </div>
        </div>
    );
}