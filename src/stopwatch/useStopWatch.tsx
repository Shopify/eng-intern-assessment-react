import { useEffect, useRef, useState } from 'react';

interface UseStopWatchOptions {
  period?: number;
}

/**
 * Hook to manage a stopwatch. All times are in milliseconds.
 */
export function useStopWatch({ period = 30 }: UseStopWatchOptions = {}) {
  const intervalRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  function start() {
    stop();

    let startTime = Date.now() - elapsedTime;

    function tick() {
      setElapsedTime(Date.now() - startTime);
    }

    intervalRef.current = window.setInterval(tick, period);
    setIsRunning(true);
  }

  function stop() {
    if (typeof intervalRef.current === 'undefined') {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    setIsRunning(false);
  }

  function reset() {
    stop();
    setElapsedTime(0);
    setLaps([]);
  }

  function recordLap() {
    setLaps([...laps, elapsedTime]);
  }

  // Clean up side-effects on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    isRunning,
    elapsedTime,
    laps,
    start,
    stop,
    reset,
    recordLap,
  };
}
