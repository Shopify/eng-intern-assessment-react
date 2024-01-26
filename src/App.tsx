import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

import { formatTime } from "./StopWatch";

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [isRunning] = useState<boolean>(false);
    const lapsRef = useRef<number[]>([]);
    const timerRef = useRef<number>();

    const startWatch = (): void => {
        if (isRunning) {
            clearInterval(timerRef.current);
        } else {
            timerRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
    };

    const stopWatch = (): void => {
        clearInterval(timerRef.current);
    };

    const resetStopwatch = (): void => {
        clearInterval(timerRef.current);
        setTime(0);
        lapsRef.current = [];
    };

    const recordLap = (): void => {
        lapsRef.current.push(time);
    };

    return(
        <div className="App">
            <h1>Stopwatch</h1>
            <StopWatch time={time}></StopWatch>
            <div className="stopwatch-display">{}</div>
                <div className="button-container">
                    <StopWatchButton startWatch={startWatch} stopWatch={stopWatch} resetStopwatch={resetStopwatch} recordLap={recordLap} />
                </div>
                <div className="laps-container">
                {lapsRef.current.map((lapTime, index) => (
                    <div key={index} className='laps'>
                        Lap{index + 1} - {formatTime(lapTime)}
                    </div>
                ))}
            </div>
        </div>
    )
}