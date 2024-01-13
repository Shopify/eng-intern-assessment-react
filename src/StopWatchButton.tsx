import React, { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRotateRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { Time } from './App';

interface StopWatchButtonProps {
    time: Time;
    setTimeInSec: Dispatch<SetStateAction<number>>;
    setLapArray: Dispatch<SetStateAction<Array<Time>>>;
}

const StopWatchButton: React.FC<StopWatchButtonProps> = (props) => {
    const { time, setTimeInSec, setLapArray} = props;
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
        setLapArray([]);
    };

    const handleLap = () => {
        setLapArray((prevLapArray) => [...prevLapArray, time]);
    };

    return(
        <div className="button-container">
            {!isRunning ?
                <>
                    <button className="button-start" onClick={handleStart}>
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <button className="button-reset" onClick={handleReset}>
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                </> : 
                <>
                    <button className="button-stop" onClick={handleStop}>
                        <FontAwesomeIcon icon={faStop} />
                    </button>
                    <button className="button-reset" onClick={handleLap}>
                        <FontAwesomeIcon icon={faClock} />
                    </button>
                </>
            }
            
        </div>
    );
};

export default StopWatchButton;