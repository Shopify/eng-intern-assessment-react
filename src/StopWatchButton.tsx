import React from 'react';

interface StopWatchButtonProps {
    type: 'toggle' | 'reset';
    running: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ type, running, handleStart, handleStop, handleReset }) => {
    let handleClick;
    let buttonText;

    if (type === 'toggle') {
        handleClick = running ? handleStop : handleStart;
        buttonText = running ? 'Stop' : 'Start';
    } else if (type === 'reset') {
        handleClick = handleReset;
        buttonText = 'Reset';
    }

    return (
        <button onClick={handleClick}>
            {buttonText}
        </button>
    );
}

export default StopWatchButton;
