import React from 'react'
import "./LapButton.css"

interface LapButtonProps {
    time: number;
    laps: number[];
    setLaps: React.Dispatch<React.SetStateAction<number[]>>;
    isDisabled: boolean;
}

const LapButton: React.FC<LapButtonProps> = ({ time, laps, setLaps, isDisabled }) => {

    const handleLap = () => {
        if (!isDisabled) {
            setLaps([...laps, time]);
        }
    };

    return (
        <div>
            <button
                onClick={handleLap}
                className={`${isDisabled ? 'button-disabled' : 'button'}`}
            >
                Lap
            </button>
        </div>
    )
}

export default LapButton;
