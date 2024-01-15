import React, {useState, useEffect} from 'react';
import StopWatchButton from './StopWatchButton'; // Import the StopWatchButton component

export default function StopWatch() {
    // Add state variables to the StopWatch component for the stopwatch logic
    const [isRunning, setIsRunning] = useState(false); // State variable to track whether the stopwatch is running
    const [elapsedTime, setElapsedTime] = useState<number>(0); // State variable to track the elapsed time
    const [laps, setLaps] = useState<number[]>([]); // State variable to track the laps
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // State variable to track the timer interval ID
      
    // Add a useEffect hook to the Stop Watch component for the timer logic
    useEffect(() => {
        if (isRunning) {
            // Start the timer to update the elapsed time every 10ms if stopwatch is running
            const id = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 10);
            }, 10);
            setIntervalId(id);
        } else {
            // Clear the timer interval if stopwatch is not running
            if (intervalId) clearInterval(intervalId);
        }
        // Clear the timer interval if the component unmounts or the isRunning state changes
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isRunning]);
      
    // Add event handlers to start the stopwatch, stop the stopwatch, reset the stopwatch, and record a lap
    const handleStart = () => {
        setIsRunning(true);
    };
      
    const handleStop = () => {
        setIsRunning(false);
    };
      
    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]);
    };
      
    const handleLap = () => {
        setLaps((prevLaps) => [...prevLaps, elapsedTime]);
    };
    
    // Render the StopWatch component UI
    return(
        <div className="stop-watch">
            <h1>Stopwatch</h1>
            <div>{(elapsedTime / 1000).toFixed(2)}</div>
            <div>
                // Add control buttons to the StopWatch component UI
                <StopWatchButton onClick={handleStart} label="Start" disabled={isRunning} />
                <StopWatchButton onClick={handleStop} label="Stop" disabled={!isRunning} />
                <StopWatchButton onClick={handleReset} label="Reset" />
                <StopWatchButton onClick={handleLap} label="Lap" disabled={!isRunning} />
            </div>
            // Add a list of laps to the StopWatch component UI
            {laps.length > 0 && (
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>{(lap / 1000).toFixed(2)}</li>
                ))}
                </ul>
            )}
        </div>
    );
}