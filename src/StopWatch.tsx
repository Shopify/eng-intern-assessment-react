import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0); // state to keep track of time elapsed
    const [isRunning, setIsRunning] = useState(false); // state to manage if the stopwatch is running
    const [laps, setLaps] = useState<number[]>([]); // state to store lap times
    const [displayTime, setDisplayTime] = useState(true); // state to control display of time
    const [isPaused, setIsPaused] = useState(false); // state to manage if the stopwatch is paused

    useEffect(() => {
        let interval: any = null;
        // sets an interval to update the time when the stopwatch is running
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        // clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [isRunning, isPaused]);

    // time formatting for readability
    const formatTime = (time: number) => {
        const milliseconds = ('0' + (Math.floor(time / 10) % 100)).slice(-2);
        const seconds = ('0' + (Math.floor(time / 1000) % 60)).slice(-2);
        const minutes = ('0' + (Math.floor(time / 60000) % 60)).slice(-2);
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    // handles start and stop functionality
    const handleStartStop = () => {
        setIsRunning(!isRunning);
        setDisplayTime(true);
    };
    
    // records current time as a lap
    const handleLap = () => {
        setLaps([...laps, time]);
    };

    // resets stopwatch to inital state
    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
        setIsPaused(false);
        setDisplayTime(true);
    };

    // toggles the pause/resume state of the stopwatch
    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh' 
        }}>
            <div style={{ 
                flex: '0 1 auto', 
                marginBottom: '20px',
                textAlign: 'center' // center align text
            }}>
                {displayTime && <h1 style={{ fontSize: '3em' }}>{formatTime(time)}</h1>}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <StopWatchButton onClick={handleStartStop} label={isRunning ? 'Stop' : 'Start'} />
                    {isRunning && <StopWatchButton onClick={handleLap} label='Lap' />}
                    {isRunning && !isPaused && <StopWatchButton onClick={handlePauseResume} label='Pause' />}
                    {isRunning && isPaused && <StopWatchButton onClick={handlePauseResume} label='Resume' />}
                    <StopWatchButton onClick={handleReset} label='Reset' />
                </div>
            </div>
            <div style={{ 
                flex: '1 1 auto', 
                overflowY: 'auto', 
                width: '100%', 
                maxWidth: '300px'
            }} data-testid="lap-list">
                {laps.map((lap, index) => (
                    <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>{formatTime(lap)}</div>
                ))}
            </div>
        </div>
    );
}