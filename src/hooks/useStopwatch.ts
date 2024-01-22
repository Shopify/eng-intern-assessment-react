import { useState, useEffect } from 'react';

// Custom hook for stopwatch logic
const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);  // Manages the running state of the stopwatch
  const [startTime, setStartTime] = useState<number | null>(null);  // Records the start time of the stopwatch
  const [laps, setLaps] = useState<number[]>([]);  // Stores recorded laps
  // Add a state to trigger re-renders
  const [, setTick] = useState(0);  // Used to force component re-renders

  const getElapsedTime = () => {
    // Calculate elapsed time as the difference from the current time to the start time
    return startTime ? Date.now() - startTime : 0;
  };

  // Starts the stopwatch
  const start = () => {
    // Sets the start time and begins the timer
    if (!isRunning) {
      setStartTime(prevStartTime => prevStartTime ?? Date.now());
      setIsRunning(true);
    }
  };

  // Stops the stopwatch
  const stop = () => {
    // Stops the timer
    if (isRunning) {
      setIsRunning(false);
    }
  };

  // Resets the stopwatch
  const reset = () => {
    // Stops the timer and resets the elapsed time and laps
    setIsRunning(false);
    setStartTime(null);
    setLaps([]);
  };

  // Records a lap
  const lap = () => {
    // Records the current elapsed time as a lap
    if (isRunning && startTime) {
      setLaps([...laps, getElapsedTime()]);
    }
  };

  // Effect to trigger re-renders every 10ms when the stopwatch is running
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      // This interval will trigger a re-render every 10ms
      interval = setInterval(() => {
        // Force state update to re-render component
        setTick(tick => tick + 1);
      }, 10);
    } else if (interval) {
      // Clear interval when stopwatch stops
      clearInterval(interval);
    }

    return () => {
      // Cleanup interval when component unmounts
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime]);

  return { isRunning, elapsedTime: getElapsedTime(), start, stop, reset, laps, lap };
};

export default useStopwatch;
