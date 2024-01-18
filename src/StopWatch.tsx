import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './StopWatch.css';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 10); // Update the time every 10 milliseconds
        } else if (!running && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, time]);

    const handleStartStop = () => {
        setRunning(!running);
    }

    const handleReset = () => {
        setTime(0);
        setLaps([]);
    }

    const handleLap = () => {
        setLaps([...laps, time]);
    }

    // Convert the time to hours, minutes, seconds, and milliseconds
    const formatTime = (time: number) => {
        const milliseconds = ("00" + (Math.floor(time) % 100)).slice(-2);
        const seconds = ("00" + (Math.floor(time / 100) % 60)).slice(-2);
        const minutes = ("00" + (Math.floor(time / 6000) % 60)).slice(-2);
        const hours = ("00" + Math.floor(time / 360000)).slice(-2);

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div>
            <h1>{formatTime(time)}</h1>
            <StopWatchButton onClick={handleStartStop} label={running ? 'Stop' : 'Start'} />
            <StopWatchButton onClick={handleReset} label='Reset' />
            <StopWatchButton onClick={handleLap} label='Lap' />
            {laps.map((lap, index) => (
                <h2 key={index}>Lap {index + 1}: {formatTime(lap)}</h2>
            ))}
        </div>
    );
}
