import {useEffect, useRef, useState} from 'react';

/**
 * Gets time since some origin in milliseconds
 * @returns {number}
 */
function getCheckpoint(): number {
  // could be replaced with `Date.now()` or other relative time
  return performance.now();
}

export interface Lap {
  id: string;
  milliseconds: number;
}

export interface Stopwatch {
  /** The current stopwatch time in milliseconds */
  milliseconds: number;
  /** The list of captured laps */
  laps: Lap[];
  /** Resumes the stopwatch */
  resume: () => void;
  /** Pauses the stopwatch */
  pause: () => void;
  /** Resets the stopwatch */
  reset: () => void;
  /** Captures a lap measuring the amount of milliseconds since last lap */
  lap: () => void;
}

/**
 * A hook for tracking time and laps, with the ability to pause and resume
 * @returns {Stopwatch}
 */
export function useStopwatch(): Stopwatch {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [laps, setLaps] = useState<Lap[]>([]);

  // `checkpoint` is the time when the stopwatch was last resumed
  const checkpoint = useRef(getCheckpoint());
  // `previousPeriods` is the accumulated time outside of the current period
  const previousPeriods = useRef(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const period = getCheckpoint() - checkpoint.current;
      setMilliseconds(period + previousPeriods.current);
    }, 10);

    return () => clearInterval(interval);
  }, [isPaused]);

  return {
    milliseconds,
    laps,
    resume: () => {
      if (!isPaused) return;
      checkpoint.current = getCheckpoint();
      setIsPaused(false);
    },
    pause: () => {
      if (isPaused) return;
      const period = getCheckpoint() - checkpoint.current;
      previousPeriods.current += period;
      setIsPaused(true);
    },
    reset: () => {
      previousPeriods.current = 0;
      checkpoint.current = getCheckpoint();
      setMilliseconds(0);
      setLaps([]);
    },
    lap: () =>
      setLaps((arr) => [
        ...arr,
        {
          id: `Lap ${arr.length + 1}`,
          milliseconds: milliseconds - (arr[arr.length - 1]?.milliseconds ?? 0),
        },
      ]),
  };
}
