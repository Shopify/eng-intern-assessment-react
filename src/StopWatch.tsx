import React, { useState, useRef } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
    const [timer, setTimer] = useState(0);
    const [laps, setLaps] = useState([]);
    const countRef = useRef(null);

    const startTimer = () => {
        if (countRef.current !== null) return;
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(countRef.current);
        countRef.current = null;
    };

    const resetTimer = () => {
        clearInterval(countRef.current);
        countRef.current = null;
        setTimer(0);
        setLaps([]);
    };

    const addLap = () => {
        setLaps([...laps, timer]);
    };

    return (
        <div>
            <h1>{timer}</h1>
            <StopWatchButton onClick={startTimer} title="Start" />
            <StopWatchButton onClick={stopTimer} title="Stop" />
            <StopWatchButton onClick={resetTimer} title="Reset" />
            <StopWatchButton onClick={addLap} title="Lap" />
            {laps.map((lap, index) => (
                <h2 key={index}>Lap {index + 1}: {lap}</h2>
            ))}
        </div>
    );
}
