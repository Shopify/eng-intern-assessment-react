import React, { useRef } from "react";

type StopwatchState = "idle" | "running" | "stopped";

type UseStopwatch = {
  state: StopwatchState;
  elapsedTime: number;
  handleStart: () => void;
  handleStop: () => void;
  handleReset: () => void;
};

type UseStopwatchParams = {
  initialTime?: number;
  updateInterval?: number;
  debug?: boolean;
};

const log = (message: string) => console.log(`[useStopwatch] ${message}`);

/**
 * A hook that encapsulates stopwatch behaviour.
 *
 * @example
 *
 * ```tsx
 * import React from 'react';
 *
 * const Stopwatch = () => {
 *   const {
 *     state
 *     elapsedTime,
 *     handleStart,
 *     handleStop,
 *     handleReset,
 *   } = useStopwatch({ });
 *
 *   return (
 *     <div>
 *       <p>Stopwatch Elapsed Time: {elapsedTime} ms</p>
 *       <button onClick={handleStart}>Start</button>
 *       <button onClick={handleStop}>Stop</button>
 *       <button onClick={handleReset}>Reset Stopwatch</button>
 *
 *       <ul>
 *         {laps.map((lap) => (
 *           <li key={lap.id}>
 *             Lap {lap.id}: Duration {lap.duration} ms, Elapsed {lap.elapsed} ms
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * };
 *
 * export default Stopwatch;
 * ```
 */
export default function useStopWatch({ initialTime = 0, updateInterval = 10, debug = false }: UseStopwatchParams): UseStopwatch {
  const [state, setState] = React.useState<StopwatchState>("idle");
  const [elapsedTime, setElapsedTime] = React.useState<number>(initialTime);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const clearIntervalInternal = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [intervalRef]);

  // Using date is a more reliable approach than relying just on
  // setInterval because it is not guaranteed to run at precise intervals.
  const handleStart = React.useCallback(() => {
    if (state === "idle") {
      debug && log("Starting timer");

      const startTime = Date.now();

      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const newElapsedTime = currentTime - startTime;

        setElapsedTime(newElapsedTime);
      }, updateInterval);

      setState("running");
    } else if (state === "stopped") {
      debug && log("Starting timer");

      const startTime = Date.now() - elapsedTime;

      intervalRef.current = setInterval(() => {
        const currentTime = Date.now();
        const newElapsedTime = currentTime - startTime;

        setElapsedTime(newElapsedTime);
      }, updateInterval);

      setState("running");
    }
  }, [state, intervalRef, elapsedTime, updateInterval]);

  const handleStop = React.useCallback(() => {
    debug && log("Pause timer");

    if (state === "running") {
      clearIntervalInternal();
      setState("stopped");
    }
  }, [state]);

  const handleReset = React.useCallback(() => {
    debug && log("Resetting timer");

    clearIntervalInternal();
    setState("idle");
    setElapsedTime(initialTime);
  }, []);

  React.useEffect(() => {
    return () => clearIntervalInternal();
  }, []);

  return {
    state,
    elapsedTime,
    handleStart,
    handleStop,
    handleReset,
  };
}

export type { StopwatchState, UseStopwatch, UseStopwatchParams };
