import React from 'react';

interface StopWatchButtonProps {
    isRunning: boolean;        
    onStartStop: () => void;   // Function to start/stop the stopwatch
    onResetLap: () => void;    // Function to reset the lap or record a lap
}

export default function StopWatchButton({ isRunning, onStartStop, onResetLap }: StopWatchButtonProps) {

    // Determine the button class based on the running state
    const buttonClass = isRunning ? 'button button-stop' : 'button button-start';

    return (
        <div>
            <button onClick={onResetLap} className="button button-reset-lap">
                {isRunning ? 'Lap' : 'Reset'}
            </button>

            <button onClick={onStartStop} className={buttonClass}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </div>
    );
}
