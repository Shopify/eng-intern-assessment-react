import React from 'react'
import "./ClearButton.css"

interface ClearButtonProps {
    setTime: React.Dispatch<React.SetStateAction<number>>;
    setLaps: React.Dispatch<React.SetStateAction<number[]>>;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClearButton: React.FC<ClearButtonProps> = ({ setTime, setLaps, setIsRunning }) => {
    const resetTimer = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
    };

    return (
        <div>
            <button onClick={resetTimer} className="button">Reset</button>
        </div>
    )
}

export default ClearButton;
