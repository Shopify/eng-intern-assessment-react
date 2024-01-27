import React, { useState } from 'react';
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

// renders the stopwatch and has all the functionality
export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);

    const handleStart = () => {
        if (!isRunning) {
        setIsRunning(true);
        const startTime = Date.now() - time;
        const interval = setInterval(() => {
            setTime(Date.now() - startTime);
        }, 100);
        // Save interval ID to state
        // This will be used to clear the interval when the stopwatch is stopped or reset
        // It's important to clear intervals to avoid memory leaks
        setIsRunning(true);
        }
    };

    const handleStop = () => {
        if (isRunning) {
        setIsRunning(false);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    return (
        <div>
        <StopWatch time={time} laps={laps} />
        <StopWatchButton
            isRunning={isRunning}
            onStart={handleStart}
            onStop={handleStop}
            onReset={handleReset}
            onLap={handleLap}
        />
        </div>
    );
}