/**
 * @author Jaza Khan <jaza-k@protonmail.com>
 */


import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const Stopwatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);

    // hook for managing stopwatch timer
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // set an interval when stopwatch is running
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (!running && interval !== null) {
            // clear interval when stopwatch stops
            clearInterval(interval);
        }

        // cleanup function on component unmount
        return () => interval && clearInterval(interval);
    }, [running]);

    const handleStartStop = () => {
        setRunning(!running);
    };

    const handleReset = () => {
        setRunning(false);
        setTime(0);
        setLaps([]); // clear all laps on reset
    };

    const handleLap = () => {
        if (running) {
            setLaps([...laps, time]); // record current time as a lap
        }
    };

    // utility function to format time in mm:ss.SSS format
    const formatTime = (time: number) => {
        let milliseconds = time % 1000;
        let seconds = Math.floor(time / 1000) % 60;
        let minutes = Math.floor(time / 60000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    };

    return (
        <div>
            <div>{formatTime(time)}</div>
            <div>
                <Button onClick={handleStartStop}>{running ? 'Stop' : 'Start'}</Button>
                <Button onClick={handleReset}>Reset</Button>
                <Button onClick={handleLap} disabled={!running}>Lap</Button>
            </div>
            <div>
                {laps.map((lapTime, index) => (
                    <div key={index}>Lap {index + 1}: {formatTime(lapTime)}</div>
                ))}
            </div>
        </div>
    );
};

export default Stopwatch;