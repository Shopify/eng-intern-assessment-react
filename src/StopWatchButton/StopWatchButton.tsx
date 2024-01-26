// StopWatchButton.tsx
import React from 'react';
import "./StopWatchButton.css";

interface StopWatchButtonProps {
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ isRunning, setIsRunning }) => {
    const buttonStyle = !isRunning ? "button-start" : "button-stop";
    const buttonText = !isRunning ? "Start" : "Stop";

    const handleClick = () => {
        setIsRunning(!isRunning);
    }

    return (
        <div>
            <button onClick={handleClick} className={buttonStyle}>{buttonText}</button>
        </div>
    );
}

export default StopWatchButton;
