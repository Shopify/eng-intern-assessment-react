import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [displayTime, setDisplayTime] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval: any = null;
    
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
    
        return () => clearInterval(interval);
    }, [isRunning, isPaused]);

    const formatTime = (time: number) => {
        const milliseconds = ('0' + (Math.floor(time / 10) % 100)).slice(-2);
        const seconds = ('0' + (Math.floor(time / 1000) % 60)).slice(-2);
        const minutes = ('0' + (Math.floor(time / 60000) % 60)).slice(-2);
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
        setDisplayTime(true);
    };
    
    const handleLap = () => {
        setLaps([...laps, time]);
    };

    const handleReset = () => {
        setTime(0);
        setLaps([]);
        setIsRunning(false);
        setIsPaused(false);
        setDisplayTime(true);
    };

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
                textAlign: 'center' // Center align text
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