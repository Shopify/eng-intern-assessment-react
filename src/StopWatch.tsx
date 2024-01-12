import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    // State for tracking time, timer status, and laps
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    // Function to format the time into a human-readable format
    const formatTime = (time:number) => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${parseInt(minutes, 10) % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    // useEffect hook to handle the stopwatch timing
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // Start interval to update time every second when the timer is on
        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if(interval) {
            // Clear interval when timer is not running
            clearInterval(interval);
        }
        // Cleanup function to clear interval on component unmount
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerOn]);
    
    // Render the stopwatch display, control buttons, and list of laps
    return(
        <div className="stopwatch-container">
            <h1 className="stopwatch-display">{formatTime(time)}</h1>
            <StopWatchButton 
                timerOn={timerOn} 
                handleStart={() => setTimerOn(true)} 
                handleStop={() => setTimerOn(false)}
                handleReset={() => {
                    setTime(0);
                    setTimerOn(false);
                    setLaps([]);
                }}
                handleLap={() => setLaps([...laps, time])}
            />
            <div className="lap-list" data-testid="lap-list">
                {laps.map((lap, index) => (
                    <div key={index}>Lap {index + 1}: {formatTime(lap)}</div>
                ))}
            </div>
        </div>
    )
}