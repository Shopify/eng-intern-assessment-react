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

  // Formats a given time (in ms) into a readable format (mm:ss.SS)
  const formatTime = (time: number) => {
    const milliseconds = (time % 1000) / 10;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 60000) % 60;

    const formattedTime =
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}.` +
      `${milliseconds.toString().padStart(2, '0')}`;

    return formattedTime;
  };

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
        <h1>{formatTime(elapsedTime)}</h1>
      </div>
      <div>
        <StopWatchButton
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
