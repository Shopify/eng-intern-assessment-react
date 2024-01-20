import React from 'react';
import './styles/StopWatchButtonStyles.css';

/**
 * Props for StopWatchButton component.
 */
interface StopWatchButtonProps {
    onStartStopClick: () => void; // Handler for start/stop button click
    onLapClick: () => void;       // Handler for lap button click
    onResetClick: () => void;     // Handler for reset button click
}

/**
 * A component for the stopwatch buttons: Start/Stop, Lap, and Reset.
 * @param props The properties passed to the component.
 */
export default function StopWatchButton({ onStartStopClick, onLapClick, onResetClick }: StopWatchButtonProps) {
    return (
        <div className='container-button'>
            {/* Start/Stop button */}
            <button id='StartStop' onClick={onStartStopClick}>Start/Stop</button>

            {/* Lap button */}
            <button id='Laps' onClick={onLapClick}>Lap</button>

            {/* Reset button */}
            <button id='Reset' onClick={onResetClick}>Reset</button>
        </div>
    );
}