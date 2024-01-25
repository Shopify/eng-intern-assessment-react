import React from 'react';

interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStop: () => void;
    onResetLap: () => void;
}

export default function StopWatchButton({ isRunning, onStartStop, onResetLap }: StopWatchButtonProps) {
    return (
        <div>
            <button onClick={onResetLap}>
                {isRunning ? 'Lap' : 'Reset'}
            </button>
            <button onClick={onStartStop} style={{ backgroundColor: isRunning ? 'red' : 'green' }}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </div>
    );
}
