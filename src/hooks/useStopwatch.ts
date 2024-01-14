import { useState, useEffect } from 'react';

/**
 * A hook to control a stopwatch with start, pause, reset and lap functions, as well as stopwatch state
 * @returns an object with time, isRunning, laps, start, pause, reset, lap
 */
const useStopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Array<number>>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>; 

    // If running, update the time every second
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Start the timer
  const start = () => {
    setIsRunning(true);
  };

  // Stop the timer
  const pause = () => {
    setIsRunning(false);
  };

  // Reset the timer, and the laps
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Add the lap to the prev laps
  const lap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  };

  return {
    time,
    isRunning,
    laps,
    start,
    pause,
    reset,
    lap,
  };
};

export default useStopwatch;