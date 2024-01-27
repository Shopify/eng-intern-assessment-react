import React, { useState, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import { displayTime } from "./StopWatch";
import './style.css';   //using identity-obj-proxy so jest ignores css file when unit testing

export default function App() {
    const [time, setTime] = useState<number>(0);
    const [checkIfRunning] = useState<boolean>(false);
    const recordLaps = useRef<number[]>([]);
    const timer = useRef<number>();

    //
    const startWatch = (): void => {
        if (checkIfRunning) {
            clearInterval(timer.current);
        } else {
            timer.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
    };

    //stop the timer
    const stopWatch = (): void => {
        clearInterval(timer.current);
    };

    //reset watch and clear storeLaps array
    const resetWatch = (): void => {
        setTime(0);
        recordLaps.current = [];
        clearInterval(timer.current);
    };

    //push lap record into storeLap array
    const recordLap = (): void => {
        recordLaps.current.push(time);
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
                        resetWatch={resetWatch}
                        recordLap={recordLap} 
                    />
                </div>
                <div className="laps-container">
                    {recordLaps.current.map((lapTime, currindex) => (
                        <div key={currindex} className='laps'>
                            Lap{currindex+1} - {displayTime(lapTime)}
                        </div>
                    ))}
            </div>
        </div>
    )
}