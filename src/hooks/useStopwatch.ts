import { useState, useEffect } from 'react';

// Custom hook for managing stopwatch logic
const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);  // Indicates if the stopwatch is running
  const [isPaused, setIsPaused] = useState(false);    // Indicates if the stopwatch is paused
  const [startTime, setStartTime] = useState<number | null>(null);  // Start time of the stopwatch
  const [pausedTime, setPausedTime] = useState<number>(0); // Time when the stopwatch was paused
  const [laps, setLaps] = useState<number[]>([]);     // Recorded laps
  const [, setTick] = useState(0);  // State to trigger re-renders

  // Function to calculate elapsed time based on whether the stopwatch is paused or running
  const getElapsedTime = () => {
    if (isRunning && startTime) {
      return Date.now() - startTime + pausedTime;
    }
    return pausedTime;
  };

  // Starts or resumes the stopwatch
  const start = () => {
    if (!isRunning && !isPaused) {
      // Starts the timer from zero
      setStartTime(Date.now());
      setPausedTime(0);
      setIsRunning(true);
    } else if (isPaused) {
      // Resumes the timer from the paused time
      setStartTime(Date.now());
      setIsPaused(false);
      setIsRunning(true);
    }
  };

  // Pauses the stopwatch
  const pause = () => {
    if (isRunning) {
      setPausedTime(getElapsedTime()); // Save the elapsed time at pause
      setStartTime(null); // Clear the start time
      setIsPaused(true);
      setIsRunning(false);
    }
  };

  // Resets the stopwatch
  const reset = () => {
    // Clears the timer and resets all time values and laps
    setIsRunning(false);
    setIsPaused(false);
    setStartTime(null);
    setPausedTime(0);
    setLaps([]);
  };

  // Records a lap
  const lap = () => {
    // Adds the current elapsed time to the laps array
    if (isRunning) {
      setLaps([...laps, getElapsedTime()]);
    }
  };

  // Effect to trigger re-renders at a set interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning || isPaused) {
      // This interval will trigger a re-render every 10ms
      interval = setInterval(() => {
        setTick(tick => tick + 1);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, startTime]);

  // Expose the stopwatch state and control functions
  return { startTime, isRunning, isPaused, elapsedTime: getElapsedTime(), start, pause, reset, laps, lap };
};

export default useStopwatch;
