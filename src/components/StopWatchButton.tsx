import React from 'react';

interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStop: () => void;
    onResetLap: () => void;
}

export default function StopWatchButton({ isRunning, onStartStop, onResetLap }: StopWatchButtonProps) {

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
