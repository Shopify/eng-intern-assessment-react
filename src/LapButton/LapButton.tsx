import React from 'react'
import "./LapButton.css"

// Props interface for LapButton
interface LapButtonProps {
    time: number; // Current time on the stopwatch
    laps: number[]; // Array of recorded lap times
    setLaps: React.Dispatch<React.SetStateAction<number[]>>; // Function to update the laps array
    isDisabled: boolean; // Flag to indicate if the button should be disabled
}

const LapButton: React.FC<LapButtonProps> = ({ time, laps, setLaps, isDisabled }) => {

    // Handler for the Lap button click event
    const handleLap = () => {
        // If the button is not disabled, add the current time to the laps array
        if (!isDisabled) {
            setLaps([...laps, time]);
        }
    };

    // Render the Lap button with conditional styling based on the disabled state
    return (
        <div>
            <button
                onClick={handleLap}
                className={`${isDisabled ? 'button-disabled' : 'button'}`} // Apply 'button-disabled' class if disabled, otherwise 'button'
            >
                Lap
            </button>
        </div>
    )
}

export default LapButton;
