import React, { useState, useEffect } from 'react';
import StopwatchButton from './StopWatchButton';

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: number;
        if (isRunning) {
            interval = window.setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);    

    return (
        <div>
            <h2>Stopwatch</h2>
            <div>{time} seconds</div>
            <StopwatchButton onClick={() => setIsRunning(true)} label="Start" />
            <StopwatchButton onClick={() => setIsRunning(false)} label="Stop" />
            <StopwatchButton onClick={() => { setTime(0); setIsRunning(false); }} label="Reset" />
        </div>
    );
};

export default Stopwatch;