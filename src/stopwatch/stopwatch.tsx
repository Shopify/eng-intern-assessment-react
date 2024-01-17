import { useEffect, useRef, useState } from 'react';

interface UseStopWatchOptions {
  period?: number;
}

/**
 * Hook to manage a stopwatch. All times are in milliseconds.
 */
export function useStopWatch({ period = 30 }: UseStopWatchOptions = {}) {
  const intervalRef = useRef<NodeJS.Timeout>();
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  function start() {
    stop();

    let startTime = Date.now() - timeElapsed;

    function tick() {
      setTimeElapsed(Date.now() - startTime);
    }

    intervalRef.current = setInterval(tick, period);
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
    setTimeElapsed(0);
    setLaps([]);
  }

  function recordLap() {
    setLaps((cur) => [...cur, timeElapsed]);
  }

  // Cleanup side-effects when the component unmounts
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    isRunning,
    timeElapsed,
    laps,
    start,
    stop,
    reset,
    recordLap,
  };
}

export function formatMillisToTime(millis: number) {
  const date = new Date(millis);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const secondsStr = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${secondsStr}.${milliseconds}`;
}
