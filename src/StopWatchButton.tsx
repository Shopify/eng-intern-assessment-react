import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './StopWatchButton.css';

interface StopWatchButtonProps {
    setTimeInSec: Dispatch<SetStateAction<number>>
}

const StopWatchButton: React.FC<StopWatchButtonProps> = ({ setTimeInSec }) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef(null);

    const handleStart = () => {
        intervalRef.current = setInterval(() => {
            setTimeInSec((prevTime:number) => prevTime + 1)
        }, 1000);
        setIsRunning(true);
    };

    const handleStop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setTimeInSec(0);
        setIsRunning(false);
    };

    return(
        <div className="button-container">
            <button className="button-start" onClick={handleStart} disabled={isRunning}>
                <FontAwesomeIcon icon={faPlay} />
            </button>
            <button className="button-stop" onClick={handleStop}>
                <FontAwesomeIcon icon={faStop} />
            </button>
            <button className="button-reset" onClick={handleReset}>
                <FontAwesomeIcon icon={faRotateRight} />
            </button>
        </div>
    );
};

export default StopWatchButton;