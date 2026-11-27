import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';
import './App.css';

type Lap = {
    lap: number;
    time: number;
};

// function to format time
export const formatTime = (time: number) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const milliseconds = time % 100;

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString()
        .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
};

export default function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState<Lap[]>([]);


    // useEffect hook to set interval for stopwatch
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setElapsedTime(elapsedTime + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, elapsedTime]);

    // function to handle start and stop button
    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    // function to handle lap button
    const handleLap = () => {
        setLaps([...laps, { lap: laps.length + 1, time: elapsedTime }]);
    };

    // function to handle reset button
    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]);
    };

    // returning stopwatch component
    return (
        <div className="stopwatch">
            <h1 className="stopwatch-time">
                {formatTime(elapsedTime)}
            </h1>
            <StopWatchButton
                label={isRunning ? 'Stop' : 'Start'}
                onClick={handleStartStop}
            />
            <StopWatchButton
                label="Lap"
                onClick={handleLap}
                disabled={!isRunning}
            />
            <StopWatchButton
                label="Reset"
                onClick={handleReset}
                disabled={isRunning}
            />
            {laps.map((lap, index) => (
                <div key={index} className="lap">
                    <span>Lap {lap.lap}: {formatTime(lap.time)}</span>
                </div>
            ))}
        </div>
    );
}
