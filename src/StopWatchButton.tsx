import React from 'react'
import './styles/StopWatchButton.css'

type StopwatchButtonProps = {
    isRunning: boolean;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
    onLap: () => void;
};

const StopwatchButton: React.FC<StopwatchButtonProps> = ({
    isRunning,
    onStart,
    onStop,
    onReset,
    onLap
}) => {
    return (
        <div className="stopwatch-buttons">
            {!isRunning ? (
                <button onClick={onStart}>Start</button>
            ) : (
                <button onClick={onStop}>Stop</button>
            )}
            <button onClick={onReset} disabled={isRunning}>Reset</button>
            <button onClick={onLap} disabled={!isRunning}>Lap</button>
        </div>
    );
};

export default StopwatchButton;