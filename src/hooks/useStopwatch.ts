import { useState, useEffect, useRef } from 'react';

// Custom hook for managing stopwatch logic
const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);  // Manages the running state of the stopwatch
  const [elapsedTime, setElapsedTime] = useState(0);  // Tracks the amount of time passed since start
  const intervalRef = useRef<number | null>(null);    // holds the timer's ID after stopping

  // Starts the stopwatch and updates time every 10ms
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      // Create a timer that adds 10ms to the time
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

  // Resets the stopwatch: stops the timer and sets time to 0
  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  };


  // Clears the interval when the component unmounts
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { isRunning, elapsedTime, start, stop, reset };
};

export default useStopwatch;
