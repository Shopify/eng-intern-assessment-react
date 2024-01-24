
import React, { useState, useEffect } from 'react';
import Stopwatch from './StopWatch'; 
import StopwatchButton from './StopWatchButton'; 
import "./styles.css";


const App: React.FC = () => {
    // States to track elapsed time, interval ID for managing the timer, and an array to store laps
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [laps, setLaps] = useState<number[]>([]);

    // Function to start the timer by setting up an interval
    const startTimer = () => {
        if (!intervalId) {
            const id = window.setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
            setIntervalId(id);
        }
    };

    // Stop the timer by clearing the interval
    const stopTimer = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    // Reset the timer and clear recorded laps
    const resetTimer = () => {
        setTime(0);
        setLaps([]);
    };

    // Function to record a lap 
    const recordLap = () => {
        setLaps((prevLaps) => [...prevLaps, time]);
    };

    // Cleanup to clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    // Render the Stopwatch component and StopwatchButton component with lap recording functionality
    return (
        <body>
        <div className = "container">
            <div className = "timer-display">
            <Stopwatch time={time} /> 
            </div>
            <div className = "buttons">
            <StopwatchButton onStart={startTimer} onStop={stopTimer} onReset={resetTimer} onLap={recordLap} laps={laps} />
             </div>
        </div>
        </body>
    );
};

export default App; 
