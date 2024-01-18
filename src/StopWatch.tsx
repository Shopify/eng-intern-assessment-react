import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

type Lap = {
    time: number;
    lapNum: number;
};

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState<Lap[]>([]);
    const [lapStartTime, setLapStartTime] = useState(0);
    const [numLaps, setNumLaps] = useState(0); // for quickly labeling current lap

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
        if (!numLaps) {
            setNumLaps(prevNumLaps => prevNumLaps + 1);
        } else {
            laps.shift(); // avoid duplication of current lap when resuming stopwatch
        }
    };

    const handleStop = () => {
        setRunning(false);
        const latestLap: Lap = { time: time - lapStartTime, lapNum: numLaps };
        setLaps([latestLap, ...laps]);
    };

    const handleStartStop = () => {
        if (!running) handleStart();
        else handleStop();
    };

    const handleLap = () => {
        if (!running) return;
        const latestLap: Lap = { time: time - lapStartTime, lapNum: numLaps };
        setLaps([latestLap, ...laps]);
        setNumLaps(prevNumLaps => prevNumLaps + 1);
        setLapStartTime(time);
    };

    const handleReset = () => {
        setTime(0);
        setRunning(false);
        setLaps([]);
        setNumLaps(0);
        setLapStartTime(0);
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
                {numLaps > 0 && <h3>Laps</h3>}
                <ul data-testid="laps-list">
                    {running && (
                        <li>
                            Lap {numLaps}: {formatTime(time - lapStartTime)}
                        </li>
                    )}
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
export function formatTime(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor(ms / 60000) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    const milliseconds = Math.floor(ms / 10) % 100; // Divide by 10 to display 2 digits only

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
        seconds
    ).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}
