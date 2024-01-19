import { useEffect, useRef, useState } from 'react';

interface UseStopWatchOptions {
  /**
   * The interval in milliseconds at which the stopwatch should update.
   *
   * @default 30
   */
  intervalMs?: number;
}

export function useStopWatch({ intervalMs = 30 }: UseStopWatchOptions = {}) {
  const intervalRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  function start() {
    stop();

    // If we have a previous elapsed time, start counting from there.
    const startTime = Date.now() - elapsedTime;

    function tick() {
      setElapsedTime(Date.now() - startTime);
    }

    intervalRef.current = window.setInterval(tick, intervalMs);
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
    /**
     * The elapsed time in milliseconds.
     */
    elapsedTime,
    /**
     * Array of total time for each lap in milliseconds.
     */
    laps,
    start,
    stop,
    reset,
    recordLap,
  };
}
