// Renders the stopwatch and handles its functionality

import React, { useEffect, useState } from 'react';
import DisplayComponent from './StopWatch';
import { LapButtonComponent, ResetButtonComponent, StartButtonComponent, StopButtonComponent } from './StopWatchButton';
import './App.css';

export default function App() {
    // State hooks for tracking time, counting status, and lap times
    const [time, setTime] = useState(0); 
    const [counting, setCounting] = useState(false); 
    const [laps, setLaps] = useState<number[]>([]);

    // Effect hook for handling the stopwatch functionality
    useEffect(() => {
        let interval: NodeJS.Timer = null;

        // Starts the interval timer when the stopwatch is running
        if (counting) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } 

        // Cleanup function to clear the interval
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [counting]);

    // Function to handle lap recording
    const handleLap = () => {
        setLaps([...laps, time]);
    };

    // Render function for the App component
    return (
        <div className="stopwatch">
            <div className="time">
                <DisplayComponent time={time} />
            </div>

            {/* Displays button components*/}
            <div className="buttons">
                {/* Shows the Start and Reset button when the stopwatch is not running */}
                {!counting && <StartButtonComponent setCounting={setCounting} />}
                {!counting && <ResetButtonComponent setTime={setTime} setLaps={setLaps} />}
                
                {/* Shows the Stop and Lap buttons when the stopwatch is running */}
                {counting && <StopButtonComponent setCounting={setCounting} />}
                {counting && <LapButtonComponent onLap={handleLap} />}
            </div>

            {/* Displays recorded laps */}
            <div className="laps">
                {laps.map((lapTime, index) => (
                    <div key={index} className="laps">
                        <span className="lap-number">Lap {index + 1}:</span>
                        <DisplayComponent time={lapTime} />
                    </div>
                ))}
            </div>
        </div>
    );
}
