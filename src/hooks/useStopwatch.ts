import {useEffect, useRef, useState} from 'react';

/**
 * Gets time since some origin in milliseconds
 * @returns {number}
 */
function getCheckpoint(): number {
  return performance.now();
}

interface Lap {
  id: string;
  milliseconds: number;
}

export interface Stopwatch {
  milliseconds: number;
  laps: Lap[];
  isPaused: boolean;
  resume: () => void;
  pause: () => void;
  reset: () => void;
  lap: () => void;
}

export function useStopwatch(): Stopwatch {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  const checkpoint = useRef(getCheckpoint());
  const interval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
    } else {
      checkpoint.current = getCheckpoint();
      interval.current = setInterval(() => {
        const elapsed = getCheckpoint() - checkpoint.current;
        checkpoint.current = getCheckpoint();
        setMilliseconds((prev) => prev + elapsed);
      }, 10);
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [isPaused]);

  return {
    milliseconds,
    laps,
    isPaused,
    resume: () => setIsPaused(false),
    pause: () => setIsPaused(true),
    reset: () => {
      setMilliseconds(0);
      checkpoint.current = getCheckpoint();
    },
    lap: () =>
      setLaps((prev) => [...prev, {id: `Lap #${prev.length}`, milliseconds}]),
  };
}
