// src/App.tsx
import React, { useState, useEffect } from 'react';
import Stopwatch from './StopWatch';
import StopwatchButton from './StopWatchButton';

const App: React.FC = () => {
    // State to manage the current time and the interval ID
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    // Function to start the timer
    const startTimer = () => {
        // Check if the timer is not already running
        if (!intervalId) {
            // Set up an interval to increase time every second
            const id = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000); 
            setIntervalId(id);
        }
    };

    // Function to stop the timer
    const stopTimer = () => {
        
        if (intervalId !== null) {
            
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    // Function to reset the timer
    const resetTimer = () => {
       
        setTime(0);
    };

    // Clean-up effect to clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            
            if (intervalId !== null) {
                
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    // Render the Stopwatch and StopwatchButton components
    return (
        <div>
            <Stopwatch time={time} />
            <StopwatchButton onStart={startTimer} onStop={stopTimer} onReset={resetTimer} />
        </div>
    );
};

export default App;