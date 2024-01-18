import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<Array<any>>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }

        return () => clearInterval(interval);
    }, [running]);

    const handleStart = () => {
        setRunning(true);
        // TODO: Add lap functionality
    };

    const handleStop = () => {
        setRunning(false);
        // TODO: Add lap functionality
    };

    const handleStartStop = () => {
        if (!running) handleStart();
        else handleStop();
    };

    const handleLap = () => {
        if (!running) return;
        // TODO: Add lap functionality
    };

    const handleReset = () => {
        setTime(0);
        setRunning(false);
        setLaps([]);
    };

    return (
        <div>
            <h2>Akash Adhikary's Stopwatch</h2>
            <p data-testid="time-display">{formatTime(time)}</p>
            <StopWatchButton
                isRunning={running}
                title="Start"
                secondaryTitle="Stop"
                onClick={handleStartStop}
            />
            <StopWatchButton isRunning={running} title="Lap" onClick={handleLap} />
            <StopWatchButton isRunning={running} title="Reset" onClick={handleReset} />
            <div>
                {laps.length > 0 && <h3>Laps</h3>}
                <ul data-testid="laps-list">
                    {laps.map(({ time, lapNum }) => (
                        <li key={lapNum}>
                            Lap {lapNum}: {formatTime(time)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/**
 * Helper function to format time in ms to hh:mm:ss:ms
 * @param {number} ms - time in milliseconds
 * @returns {string} - formatted time
 **/
const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    const milliseconds = Math.floor(ms / 10) % 100; // Divide by 10 to display 2 digits only

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
        seconds
    ).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
};
