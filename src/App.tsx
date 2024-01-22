import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId: number;
        if (isRunning) {
            intervalId = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const Time = (time: number): string => {
        const hours = Math.floor(time / 360000);
        const minutes = Math.floor((time % 360000) / 6000);
        const seconds = Math.floor((time % 6000) / 100);
        const milliseconds = time % 100;

        return `${String(hours).padStart(2, '0')}: ${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}: ${String(milliseconds).padStart(2, '0')}`
    };

    const handleStartStopClick = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const handleResetClick = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div>
            <h1>Shopify Stopwatch</h1>
            <StopWatch
                time={time}
                Time={Time}
            />
            <StopWatchButton
                isRunning={isRunning}
                onStartStopClick={handleStartStopClick}
                onResetClick={handleResetClick}
            />
        </div>
    )
}