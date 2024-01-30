import React, { useState, useEffect } from 'react';
import './StopWatch.css'; 

// Functional component representing a stopwatch
export default function StopWatch() {
  // State variables to manage stopwatch data
  const [start, setStart] = useState(0);       // Start time in milliseconds
  const [elapsed, setElapsed] = useState(0);   // Elapsed time in milliseconds
  const [isTiming, setIsTiming] = useState(false);  // Flag to track whether the stopwatch is running or not
  const [laps, setLaps] = useState<number[]>([]);  // Array to store lap times in milliseconds

  // Effect hook to handle timer updates when the stopwatch is running
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // If the stopwatch is running, update the elapsed time every 10 milliseconds
    if (isTiming) {
      setStart(Date.now() - elapsed);
      timerId = setInterval(() => {
        setElapsed(Date.now() - start);
      }, 10);
    }

    // This is cleanup function to clear the interval when the component unmounts or when isTiming, elapsed, or start changes
    return () => clearInterval(timerId);
  }, [isTiming, elapsed, start]);

  // Function to format total milliseconds into a readable time string (MM:SS:mmm)
  const time = (totalMilliseconds: number): string => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const milliseconds = totalMilliseconds % 1000;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  // This is the function to start the stopwatch
  const startTimer = () => {
    setIsTiming(true);
  };

  // Function to stop the stopwatch
  const stop = () => {
    setIsTiming(false);
  };

  // Function to reset the stopwatch to initial state
  const reset = () => {
    setIsTiming(false);
    setStart(0);
    setElapsed(0);
    setLaps([]);
  };

  // Function to record a lap time
  const lap = () => {
    setLaps([...laps, elapsed]);
  };

  // This is the code for the UI
  return (
    <div>
      <h1>StopWatch</h1>
      <div className="stopwatch-container">
        <div className="stopwatch-time">{time(elapsed)}</div>
        <div className="stopwatch-buttons">
          <button onClick={startTimer} className="start-button">
            Start
          </button>
          <button onClick={stop} className="stop-button">
            Stop
          </button>
          <button onClick={reset} className="reset-button">
            Reset
          </button>
          <button onClick={lap} className="lap-button">
            Lap
          </button>
        </div>
        <ul className="lap-list">
          {laps.map((lap, index) => (
            <li key={index} className="lap-item">{`Lap ${index + 1}: ${time(lap)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
