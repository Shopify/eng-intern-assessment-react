import React from 'react';

interface StopWatchButtonProps {
    isRunning: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLap: () => void;
}

//component definition and button rendering 
const StopWatchButton: React.FC<StopWatchButtonProps> = ({
    isRunning,
    handleStart,
    handleStop,
    handleReset,
    handleLap
}) => {
    return (
        <div>
            <button className='start-button' onClick={handleStart} disabled={isRunning}>Start</button>
            <button className='stop-button' onClick={handleStop} disabled={!isRunning}>Stop</button>
            <button className='reset-button' onClick={handleReset}>Reset</button>
            <button className='lap-button' onClick={handleLap} disabled={!isRunning}>Lap</button>
        </div>
    );
};

export default StopWatchButton;
