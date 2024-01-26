import React from 'react'
import "./ClearButtonStyles.css"

// Interface defining the props for ClearButton
interface ClearButtonProps {
    setTime: React.Dispatch<React.SetStateAction<number>>; // Function to set the time state
    setLaps: React.Dispatch<React.SetStateAction<number[]>>; // Function to set the laps state
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the running state
}

const ClearButton: React.FC<ClearButtonProps> = ({ setTime, setLaps, setIsRunning }) => {
    // Function to reset the timer
    const resetTimer = () => {
        setTime(0); // Reset time to 0
        setLaps([]); // Clear all recorded laps
        setIsRunning(false); // Stop the stopwatch
    };

    // Render the Reset button
    return (
        <div>
            <button onClick={resetTimer} className="button">Reset</button>
        </div>
    )
}

export default ClearButton;
