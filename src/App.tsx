import React from 'react'
import { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import StopWatch from './StopWatch';

export default function App() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeId, setTimeId] = useState(null);
    const [laps, setLaps] = useState([]);

    const startTimer = () => {
        setIsRunning(true);
        const startTime = Date.now() - time;
        const updateTimer = () => {
            setTime(Date.now() - startTime);
            const newtimeId = requestAnimationFrame(updateTimer);
            setTimeId(newtimeId);
        };
        const newtimeId = requestAnimationFrame(updateTimer);
        setTimeId(newtimeId);
    };

    const pauseTimer = () => {
        setIsRunning(false);
        if (timeId !== null) {
            cancelAnimationFrame(timeId);
            setTimeId(null);
        }
    };

    const stopTimer = () => {
        setIsRunning(false);
        setTime(0);
        if (timeId !== null) {
            cancelAnimationFrame(timeId);
            setTimeId(null);
        }
    };

    const recordLap = () => {
        const newLap = formattedTime.hours + ":" + formattedTime.minutes + ":" + formattedTime.seconds + ":" + formattedTime.milliseconds;
        setLaps([...laps, newLap]);
    };

    useEffect(() => {
        return () => {
            if (timeId !== null) {
                cancelAnimationFrame(timeId);
            }
        };
    }, [timeId]);

    const clearLaps = () => {
        setLaps([]);
    };

    const formattedTime = {
        hours: Math.floor(Math.floor(Math.floor(time / 1000) / 60) / 60).toString().padStart(2, '0'),
        minutes: (Math.floor(Math.floor(time / 1000) / 60) % 60).toString().padStart(2, '0'),
        seconds: (Math.floor(time / 1000) % 60).toString().padStart(2, '0'),
        milliseconds: (time % 1000).toString().padStart(3, '0').substring(0, 2)
    };
    return (
        <div>
            <StopWatch time={formattedTime} laps={laps} />
            <StopWatchButton
                isRunning={isRunning}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                stopTimer={stopTimer}
                recordLap={recordLap}
                clearLaps={clearLaps}
            />
        </div>
    )
}