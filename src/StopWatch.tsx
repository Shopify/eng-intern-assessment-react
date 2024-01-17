import React from 'react'
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';

// Represents the stopwatch display
// TODO: get timer working
export default function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [laps, setLaps] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);

    const handleStart = () => {
        setIsStarted(true);
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsStarted(false);
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsStarted(false);
        setLaps([]);
        setElapsedTime(0);
    };

    const handleLap = () => {
        // TODO
    };

    const formatTime = (time: number) => {
        const milliseconds = Math.floor(time % 1000) % 10;
        const seconds = Math.floor(time/1000) % 60;
        const minutes = Math.floor(time/(1000 * 60)) % 60;
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    // TODO: add div to display laps
    return(
        <div className='app-container'>
            <div className='timer-container'>
                <h1>{formatTime(elapsedTime)}</h1>
            </div>
            <StopWatchButton 
                isRunning={isRunning}
                isStarted={isStarted}
                handleStart={handleStart}
                handleStop={handleStop}
                handleReset={handleReset}
                handleLap={handleLap}
            />
        </div>
    )
}