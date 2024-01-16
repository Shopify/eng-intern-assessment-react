import { useEffect, useState } from "react";
import { formatTime } from "../utils";

export type Lap = {
  lap: number;
  totalTime: string;
  elapsedTime: string;
};

/**
 * Hook for managing a stopwatch functionality.
 *
 * @typedef {Object} Lap - Represents a lap in the stopwatch.
 * @property {number} lap - The lap time.
 * @property {string} totalTime - The total time for the lap in "mm:ss:ms" format.
 * @property {string} elapsedTime - The elapsed time since the previous lap in "mm:ss:ms" format.
 *
 * @returns {{
 *   isRunning: boolean,
 *   time: string,
 *   laps: Lap[],
 *   startHandler: () => void,
 *   pauseHandler: () => void,
 *   resetHandler: () => void,
 *   lapHandler: () => void,
 * }}
 */
export const useStopWatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [previousLapTime, setPreviousLapTime] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      const currentTime = Date.now() - time;
      intervalId = setInterval(() => setTime(Date.now() - currentTime), 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startHandler = () => {
    setIsRunning(true);
  };

  const pauseHandler = () => {
    setIsRunning(false);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setTime(0);
    setPreviousLapTime(0);
    setLaps([]);
  };

  const lapHandler = () => {
    setLaps((prev) => [
      {
        lap: prev.length + 1,
        totalTime: formatTime(time),
        elapsedTime: formatTime(time - previousLapTime),
      },
      ...prev,
    ]);
    setPreviousLapTime(time);
  };

  return {
    isRunning,
    time: formatTime(time),
    laps,
    startHandler,
    pauseHandler,
    resetHandler,
    lapHandler,
  };
};
