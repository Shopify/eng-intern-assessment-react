import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './StopWatch.css';

const StopWatch: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [previousLapTime, setPreviousLapTime] = useState<number | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [hasStarted, setHasStarted] = useState<boolean>(false);


    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            setHasStarted(true);
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    const formatTime = (milliseconds: number): string => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);

        // Pad utilized to format into a two digit value for better UI and convention
        const pad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
    };

    const handleStartStop = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const handleLap = () => {
        if (previousLapTime !== null) {
            // For the following laps, lap time = total time - previous lap time
            setLapTimes((prevLapTimes) => [time - previousLapTime, ...prevLapTimes]);

            setPreviousLapTime(null);
        } else {
            // For the first lap, lap time is the total time
            setLapTimes([time]);
        }
        // Update previous lap time in any case
        setPreviousLapTime(time);
    };

    const handleReset = () => {
        setTime(0);
        setLapTimes([]);
        setPreviousLapTime(null);
        setIsRunning(false);
        setHasStarted(false);
    };

    return (
        <div className='stopwatch-container'>
            <h1 className='stopwatch-title'>STOPWATCH</h1>
            <h5>Implementation by Stefanus Albert Welong</h5>
            <div>
                <h1 className='time-display'>{formatTime(time)}</h1>
                <div className='button-group'>
                    {/* Start and Stop Buttons does not need to co-exist; they replace one another */}
                    <StopWatchButton onClick={handleStartStop} >{isRunning ? 'STOP' : 'START'}</StopWatchButton>
                    {/* Lap is disabled when the stopwatch is not running (not started or paused) */}
                    <StopWatchButton onClick={handleLap} disabled={!isRunning}>LAP</StopWatchButton>
                    {/* Reset is disabled when the stopwatch has not been started yet */}
                    <StopWatchButton onClick={handleReset} disabled={!hasStarted}>RESET</StopWatchButton>
                </div>

                {lapTimes.map((lapTime, index) => (
                    // newest is used to highlight the latest item for better user experience.
                    <div className={`lap-list ${index === 0 ? 'newest' : ''}`} key={index}>
                        <p className={`lap-item ${index === 0 ? 'newest' : ''}`}>
                            Lap {lapTimes.length - index} - {formatTime(lapTime)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StopWatch;

