import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    // State for tracking time, timer status, and laps
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const [isPaused, setIsPaused] = useState(false);

    // Function to format the time into a human-readable format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const formattedMilliseconds = milliseconds < 100 ? `0${Math.floor(milliseconds / 10)}` : Math.floor(milliseconds / 10);

        return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
    };

    // useEffect hook to handle the stopwatch timing
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // Start interval to update time every second when the timer is on
        if (timerOn && !isPaused) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (interval) {
            clearInterval(interval);
        }
        // Cleanup function to clear interval on component unmount
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerOn, isPaused]);
    
    // Render the stopwatch display, control buttons, and list of laps
    return (
        <div className="stopwatch-container">
            <h1 className="stopwatch-display">{formatTime(time)}</h1>
            <StopWatchButton 
                timerOn={timerOn}
                isPaused={isPaused}
                handleStart={() => { setTimerOn(true); setIsPaused(false); }}
                handleStop={() => { setTimerOn(false); setIsPaused(false); }}
                handlePause={() => setIsPaused(true)}
                handleResume={() => setIsPaused(false)}
                handleReset={() => {
                    setTime(0);
                    setTimerOn(false);
                    setIsPaused(false);
                    setLaps([]);
                }}
                handleLap={() => setLaps([...laps, time])}
            />
            <div className="lap-list" data-testid="lap-list">
                {laps.map((lap, index) => (
                    <div key={index} data-testid={`lap-${index}`}>
                        Lap {index + 1}: {formatTime(lap)}
                    </div>
                ))}
            </div>
        </div>
    );
}