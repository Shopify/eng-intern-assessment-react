import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false); // stopwatch is running
  const [elapsedTime, setElapsedTime] = useState(0); // in ms

  // If the stopwatch is running, update the elapsed time every 10ms
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Handlers for the stop, start, and reset
  const handleStart = () => {
    setIsRunning(true);
  };
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div>
      <div>
        <h1>{elapsedTime}</h1>
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
