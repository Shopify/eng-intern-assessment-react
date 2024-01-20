import React, { useState, useEffect } from 'react';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Effect to run the stopwatch
  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10); // Update every 10 milliseconds
      }, 10); // Update interval set to 10 milliseconds
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    // Clean up the interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  // Start the stopwatch
  const handleStart = () => setIsRunning(true);

  // Pause the stopwatch
  const handlePause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
  };

  // Reset the stopwatch
  const reset = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
    setElapsedTime(0);
  };

  // Format the elapsed time into a displayable format
  const formatTime = (totalMilliseconds: number) => {
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10 );

    // Add leading zeros if number is less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMilliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  return (
    <div>
      <div className='text-main'>{formatTime(elapsedTime)}</div>
      <button className='button-outline' onClick={handleStart}>Start</button>
      <button className='button-outline' onClick={handlePause}>Pause</button>
      <button className='button-outline' onClick={reset}>Reset</button>
    </div>
  );
}
