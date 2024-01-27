import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

import { displayTime } from "./StopWatch";

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [isRunning] = useState<boolean>(false);
    const storeLaps = useRef<number[]>([]);
    const timer = useRef<number>();

    const startWatch = (): void => {
        if (isRunning) {
            clearInterval(timer.current);
        } else {
            timer.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
    };

    const stopWatch = (): void => {
        clearInterval(timer.current);
    };

    const resetStopwatch = (): void => {
        setTime(0);
        storeLaps.current = [];
        clearInterval(timer.current);
    };

    const recordLap = (): void => {
        storeLaps.current.push(time);
    };

    return(
        <div className="App">
            <h1>Stopwatch</h1>
            <StopWatch time={time}></StopWatch>
            <div className="stopwatch-display">{}</div>
                <div className="button-container">
                    <StopWatchButton 
                        startWatch={startWatch} 
                        stopWatch={stopWatch} 
                        resetStopwatch={resetStopwatch} 
                        recordLap={recordLap} 
                    />
                </div>
                <div className="laps-container">
                    {storeLaps.current.map((lapTime, index) => (
                        <div key={index} className='laps'>
                            Lap{index+1} - {displayTime(lapTime)}
                        </div>
                    ))}
            </div>
        </div>
    )
}