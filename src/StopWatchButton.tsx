import React from 'react';

// Props interface for StopWatchButton component
interface StopWatchButtonProps {
    isRunning: boolean;
    onStartStopClick: () => void;
    onLapClick: () => void;
    onResetClick: () => void;
}

// StopWatchButton component to render buttons for controlling the stopwatch
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
    isRunning,
    onStartStopClick,
    onLapClick,
    onResetClick,
}) => {
    return (
        <div>
            {/* Render buttons for start/stop, lap, and reset */}
            <button onClick={onStartStopClick}>{isRunning ? 'Stop' : 'Start'}</button>
            <button onClick={onLapClick}>Lap</button>
            <button onClick={onResetClick}>Reset</button>
        </div>
    );
};

export default StopWatchButton;