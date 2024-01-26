import React, { useState, useEffect } from 'react';
import StopWatchButton from '../StopWatchButton/StopWatchButton';
import ClearButton from '../ClearButton/ClearButton';
import LapButton from '../LapButton/LapButton';
import "./StopWatch.css";

export default function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const deleteLap = (index: number) => {
        setLaps(laps.filter((_, lapIndex) => lapIndex !== index));
    };

    return (
        <div className="stopwatch">
            <div className="time-display">
                {new Date(time).toISOString().slice(14, 22)}
            </div>
            <div className="buttons-container">
                <StopWatchButton isRunning={isRunning} setIsRunning={setIsRunning} />
            </div>
            <div className="buttons-container">
                <LapButton time={time} laps={laps} setLaps={setLaps} isDisabled={time === 0 || !isRunning}/>
                <ClearButton setTime={setTime} setLaps={setLaps} setIsRunning={setIsRunning} />
            </div>
            <ul className="laps">
                {laps.map((lap, index) => (
                    <li key={index} className="lap-item">
                        {new Date(lap).toISOString().slice(14, 22)}
                        <button className="delete-button" onClick={() => deleteLap(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
