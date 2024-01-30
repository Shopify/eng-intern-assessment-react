import React, { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';
import StopwatchButton from './StopwatchButton';

const App: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [laps, setLaps] = useState<number[]>([]);
    const [running, setRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [running]);

    const handleStart = () => setRunning(true);
    const handleStop = () => setRunning(false);
    const handleReset = () => {
        setRunning(false);
        setTime(0);
        setLaps([]);
    };
    const handleLap = () => setLaps([...laps, time]);

    return (
        <div>
            <Stopwatch time={time} />
            <StopwatchButton onClick={handleStart} label="Start" disabled={running} />
            <StopwatchButton onClick={handleStop} label="Stop" disabled={!running} />
            <StopwatchButton onClick={handleReset} label="Reset" disabled={!running && time === 0} />
            <StopwatchButton onClick={handleLap} label="Lap" disabled={!running} />
            {laps.map((lap, index) => (
                <div key={index}>Lap {index + 1}: {formatTime(lap)}</div>
            ))}
        </div>
    );
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
};

const pad = (num: number) => num.toString().padStart(2, '0');

export default App;
