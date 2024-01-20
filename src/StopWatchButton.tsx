import React, { useRef, useState } from 'react'
import './styles.css'


// StopWatchButtonProps interface defines props for the StopWatchButton components
interface StopWatchButtonProps {

    onClick: () => void;
    disabled?: boolean;
    label: string;
}


// StopWatchButton component, control button for a stopwatch
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ onClick, disabled, label }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}

export default StopWatchButton;