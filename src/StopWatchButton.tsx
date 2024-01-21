import React, { useRef, useState } from 'react'


// StopWatchButtonProps interface defines props for the StopWatchButton components
interface StopWatchButtonProps {

    onClick: () => void;
    disabled?: boolean;
    text: string;
}


// StopWatchButton component, control button for a stopwatch
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, disabled, text }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default StopWatchButton;