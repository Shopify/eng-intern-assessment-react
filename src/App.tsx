import React, { useState, useRef } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    // Ref to store the interval ID for starting/stopping the stopwatch
    const intervalIdRef = useRef<number | null>(null);
    
    // State variables
    const [isRunning, setIsRunning] = useState(false); // To track whether the stopwatch is running or stopped
    const [time, setTime] = useState(0); // To store the current time in milliseconds
    const [laps, setLaps] = useState<number[]>([]); // To store lap times
    
    // Handler for start/stop button click
    const handleStartStopClick = () => {
        // Toggle the running state
        setIsRunning((prevIsRunning) => !prevIsRunning);

        // Start or stop the interval based on the current running state
        if (!isRunning) {
            // Start the interval to update time every 10 milliseconds
            intervalIdRef.current = window.setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            // Stop the interval if the stopwatch is running
            window.clearInterval(intervalIdRef.current);
        }
    };

    // Handler for lap button click
    const handleLapClick = () => {
        // Add the current time to the laps array
        setLaps((prevLaps) => [...prevLaps, time]);
    };

    // Handler for reset button click
    const handleResetClick = () => {
        // Stop the interval and reset all state variables
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    return (
        <div>
            {/* Display the stopwatch and buttons */}
            <StopWatch time={time} laps={laps} />
            <StopWatchButton
                isRunning={isRunning}
                onStartStopClick={handleStartStopClick}
                onLapClick={handleLapClick}
                onResetClick={handleResetClick}
            />
        </div>
    );
}