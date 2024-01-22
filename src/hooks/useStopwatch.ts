import { useState, useEffect, useRef } from 'react';

// Custom hook for managing stopwatch logic
const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);  // Manages the running state of the stopwatch
  const [elapsedTime, setElapsedTime] = useState(0);  // Tracks the amount of time passed since start
  const intervalRef = useRef<number | null>(null);    // Holds the timer's ID
  const [laps, setLaps] = useState<number[]>([]);     // Stores recorded laps

  // Starts the stopwatch and updates time every 10ms
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 10);
      }, 10) as unknown as number;
    }
  };

  // Stops the stopwatch and clears the interval
  const stop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Resets the stopwatch: stops the timer and sets time and laps to 0
  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]); // Clear laps on reset
  };

  // Records a lap
  const lap = () => {
    if (isRunning) {
      setLaps([...laps, elapsedTime]);
    }
  };

  // Clears the interval when the component unmounts
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { isRunning, elapsedTime, start, stop, reset, laps, lap };
};

export default useStopwatch;
