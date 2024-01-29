// StopWatch.tsx
import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: any = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);

    const handleStart = () => setTimerOn(true);
    const handleStop = () => setTimerOn(false);
    const handleReset = () => {
        setTimerOn(false);
        setTime(0);
        setLaps([]);
    };
    const handleLap = () => setLaps([...laps, time]);

    return (
        <div>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>

            <div>
                <StopWatchButton onClick={handleStart} text="Start" />
                <StopWatchButton onClick={handleStop} text="Stop" />
                <StopWatchButton onClick={handleReset} text="Reset" />
                <StopWatchButton onClick={handleLap} text="Lap" />
            </div>

            {laps.map((lapTime, index) => (
                <p key={index}>
                    Lap {index + 1}: {("0" + Math.floor((lapTime / 60000) % 60)).slice(-2)}:
                    {("0" + Math.floor((lapTime / 1000) % 60)).slice(-2)}.
                    {("0" + ((lapTime / 10) % 100)).slice(-2)}
                </p>
            ))}
        </div>
    );
}
