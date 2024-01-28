import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

const App: React.FC = () => {
    //Hooks to track current time, laps, and if the stopwatch is running
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<{ lapNumber: number; lapTime: number; overallTime: number }[]>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    //manages the timer with updates every 10 milliseconds
    useEffect(() => {
        let interval: any = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        const lapNumber = laps.length + 1;
        const lastLapTime = laps.length > 0 ? laps[laps.length - 1].overallTime : 0;
        const lapTime = time - lastLapTime;
        const newLap = { lapNumber, lapTime, overallTime: time };
        setLaps([...laps, newLap]);
    };
    
    //formats the time in milliseconds into minutes:seconds.milliseconds format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = ((time % 1000) / 10).toFixed(0).padStart(2, '0'); // change this line
        return `${minutes}:${seconds}.${milliseconds}`;
    };
    
    //main component rendering
    return (
        <div className='stopwatch-container'>
            <h2>Stopwatch</h2>
            <StopWatch time={time} laps={laps} formatTime={formatTime} />
            <StopWatchButton
                isRunning={isRunning}
                handleStart={handleStart}
                handleStop={handleStop}
                handleReset={handleReset}
                handleLap={handleLap}
            />
        </div>
    );
};

export default App;
