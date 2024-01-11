import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimeRef = useRef(null); // Used for determining elapsed time

    useEffect(() => {
        let interval: NodeJS.Timer = null;

        if (isRunning) {
            // Track the elapsed time between renders based on the current time minus the start time
            startTimeRef.current = Date.now() - time;
            interval = setInterval(() => {
                setTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval); // Clear the interval to prevent memory leaks
    }, [isRunning]);

    // Stopwatch toggle handlers
    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);

    // Stopwatch reset handler
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    // Format the time into minutes, seconds, and milliseconds, and pad with 0s where necessary
    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60000).toString().padStart(2, '0');
        const secs = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
        const msecs = Math.floor(time % 1000 / 10).toString().padStart(2, '0');

        return { mins, secs, msecs };
    };

    const { mins, secs, msecs } = formatTime(time);

    return (
        <div style={{ display: 'flex' }}>
            <div className="timer">
                <h1>{mins}</h1>
                <h1>{secs}</h1>
                <h1>{msecs}</h1>
                <h3>{mins}:{secs}:{msecs}</h3>
            </div>
            <div className="controls"> 
                <StopWatchButton
                    type="reset"
                    running={isRunning}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    handleReset={handleReset}
                />
                <StopWatchButton
                    type="toggle"
                    running={isRunning}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    handleReset={handleReset}
                />
            </div>
        </div>
    );
}
