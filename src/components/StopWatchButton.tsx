import React from 'react'

// StopWatchButtonProps interface defines props for the StopWatchButton components
interface StopWatchButtonProps {

    onClick: () => void;
    disabled?: boolean;
    text: string;
    isStopped?: boolean;
}


// StopWatchButton component, control button for a stopwatch
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, disabled, text, isStopped }) => {
    const buttonClass = `stopwatch-button ${isStopped ? 'stop-button' : ''}`;
    return (
        <button
            className={buttonClass} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default StopWatchButton;