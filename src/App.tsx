import React, { useState, useEffect, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const lapsRef = useRef<number[]>([]);

    const formatTime = (time: number): string => {
        const seconds = ((time % 60000) / 1000).toFixed(2);
        return `${+seconds < 10 ? "0" : ""}${seconds}`;
    };

    const startStopwatch = (): void => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(timerRef.current);
        } else {
            setIsRunning(true);
            timerRef.current = window.setInterval(() => {
            setTime((prevTime) => prevTime + 10);
            }, 10);
        }
    };

    const resetStopwatch = (): void => {
        setIsRunning(false);
        clearInterval(timerRef.current);
        setTime(0);
        lapsRef.current = [];
    };

    const recordLap = (): void => {
        lapsRef.current.push(time);
    };
    
    const timerRef = useRef<number>();

    return(
        <div className="App">
            <h1>Stopwatch</h1>
            <div className="stopwatch-display">{formatTime(time)}</div>
                <div className="button-container">
                    <StopWatchButton title={"Start"} onClick={startStopwatch} />
                    <StopWatchButton title={"Stop"} onClick={startStopwatch} />
                    <StopWatchButton title="Reset" onClick={resetStopwatch} />
                    <StopWatchButton title="Lap" onClick={recordLap} />
                </div>
                <div className="laps-container">
                    {lapsRef.current.map((lapTime, index) => (
                    <div key={index} className="lap">
                        Lap {index + 1}: {formatTime(lapTime)}
                    </div>
                ))}
            </div>
        </div>
    )
}