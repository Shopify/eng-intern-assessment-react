// StopWatchButton.tsx
import React from 'react';
import "./StopWatchButtonStyles.css";

// Props interface for StopWatchButton
interface StopWatchButtonProps {
    isRunning: boolean; // Indicates if the stopwatch is currently running
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>; // Function to change the running state
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ isRunning, setIsRunning }) => {
    // Determine button style and text based on whether the stopwatch is running
    const buttonStyle = !isRunning ? "button-start" : "button-stop";
    const buttonText = !isRunning ? "Start" : "Stop";

    // Handler for click event on the button
    const handleClick = () => {
        setIsRunning(!isRunning); // Toggle the running state
    }

    // Render the button with the appropriate style and text
    return (
        <div>
            <button onClick={handleClick} className={buttonStyle}>{buttonText}</button>
        </div>
    );
}

export default StopWatchButton;
