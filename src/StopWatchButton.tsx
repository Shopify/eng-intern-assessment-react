import React from 'react';

interface StopWatchButtonProps {
    isRunning: boolean;
    handleStartStopClick: () => void;
    handleLapClick: () => void;
    handleResetClick: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ isRunning, handleStartStopClick, handleLapClick, handleResetClick }) => {
    return (
        <>
            <button onClick={handleStartStopClick}>{isRunning ? 'STOP' : 'START'}</button>
            <button onClick={handleLapClick}>LAP</button>
            <button onClick={handleResetClick}>RESET</button>
        </>
    );
};

export default StopWatchButton;
