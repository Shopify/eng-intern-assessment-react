import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const formatTime = (time:number) => {
        const getSeconds = `0${(time % 60)}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${parseInt(minutes, 10) % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if(interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerOn]);

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