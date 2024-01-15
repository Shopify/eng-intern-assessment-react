import React, { useState, useRef } from 'react';
import StopWatchButton from './StopWatchButton';

// This is the main Stopwatch component
export default function StopWatch() {
    // State for the timer and laps
    const [timer, setTimer] = useState(0);
    const [laps, setLaps] = useState([]);

    // Reference for the interval
    const countRef = useRef(null);

    // Function to start the timer
    const startTimer = () => {
        // If the timer is already running, do nothing
        if (countRef.current !== null) return;

        // Otherwise, start the timer
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    // Function to stop the timer
    const stopTimer = () => {
        // Clear the interval and set the reference to null
        clearInterval(countRef.current);
        countRef.current = null;
    };

    // Function to reset the timer
    const resetTimer = () => {
        // Clear the interval, set the reference to null, and reset the timer and laps states
        clearInterval(countRef.current);
        countRef.current = null;
        setTimer(0);
        setLaps([]);
    };

    // Function to add a lap
    const addLap = () => {
        // Add the current timer value to the laps state
        setLaps([...laps, timer]);
    };

    // Render the stopwatch interface
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
