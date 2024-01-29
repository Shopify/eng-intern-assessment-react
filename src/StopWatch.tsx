import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

// Stopwatch component
export default function StopWatch() {
  // State variables
  const [time, setTime] = useState(0);         // Current elapsed time in seconds
  const [isRunning, setIsRunning] = useState(false);  // Boolean indicating whether the stopwatch is running
  const [laps, setLaps] = useState<number[]>([]);    // Array to store recorded lap times

  // useEffect hook to handle the interval for updating the time
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // If the stopwatch is running, set up an interval to update the time every 0.1 seconds
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1); // Increase time by 0.1 seconds
      }, 100);
    }

    // Cleanup function to clear the interval when the component is unmounted or isRunning changes
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Event handlers for controlling the stopwatch
  const startStopWatch = () => {
    setIsRunning(!isRunning); // Toggle the isRunning state
  };

  const stopStopWatch = () => {
    setIsRunning(false); // Stop the stopwatch
  };

  const resetStopWatch = () => {
    setIsRunning(false); // Stop the stopwatch
    setTime(0);          // Reset the time
    setLaps([]);         // Clear the recorded laps
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]); // Record the current time as a lap
  };

  // Rendered JSX
  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch">{formatTime(time)}</h1>
      <div className="button-container">
        {/* Start/Stop button */}
        <StopWatchButton onClick={startStopWatch} label={isRunning ? 'Stop' : 'Start'} />
        {/* Lap button (disabled if the stopwatch is not running) */}
        <StopWatchButton onClick={recordLap} label="Lap" disabled={!isRunning} />
        {/* Reset button */}
        <StopWatchButton onClick={resetStopWatch} label="Reset" />
      </div>
      {/* Display recorded laps if there are any */}
      {laps.length > 0 && (
        <div className="laps-container">
          <h2>Laps</h2>
          <ul className="lap-list">
            {/* Map through laps and display formatted lap times */}
            {laps.map((lap, index) => (
              <li key={index} className="lap-item">{formatTime(lap)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Function to format time in seconds to a string (MM:SS.SSS)
const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

  // Return formatted time string
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
};
