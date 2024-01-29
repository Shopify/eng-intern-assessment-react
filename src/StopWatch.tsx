import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton';

const Stopwatch: React .FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            }
        return () => clearInterval(interval);
    }, [isRunning]);

    const startStopwatch = () => {
        setIsRunning(!isRunning);
    };
    
    const stopStopwatch = () => {
        setIsRunning(false);
    };
    
    const resetStopwatch = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const lapStopwatch = () => {
        setLaps([...laps, time]);
    };

    return(
        <div>
            <p>{formatTime(time)}</p>
            <StopWatchButton onClick={startStopwatch} label={isRunning ? 'Stop' : 'Start'} />
            <StopWatchButton onClick={lapStopwatch} label="Lap" disabled={!isRunning} />
            <StopWatchButton onClick={resetStopwatch} label="Reset" disabled={!isRunning} />
            <ul>
                {laps.map((lap, index) => (
                    <li key={index}>{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
                ))}
            </ul>    
        </div>
    );
};

const formatTime = (timeInSeconds: number):  string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes) .padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
};
export default Stopwatch;