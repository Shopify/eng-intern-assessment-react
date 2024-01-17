
import { useEffect, useState } from "react";

// The interval ms for refreshing the stopwatch component.
const STOPWATCH_REFRESH = 10;

interface Lap {
    number: number;
    totalTime: number;
    timeInterval: number;
}

/**
 * @typedef {Object} StopWatch
 * @property {number} elapsedTime - The elapsed time in milliseconds.
 * @property {boolean} isRunning - Indicates whether the stopwatch is currently running.
 * @property {Lap[]} laps - An array of lap objects.
 * @property {Function} startStopWatch - Starts the stopwatch.
 * @property {Function} stopStopWatch - Stops the stopwatch.
 * @property {Function} resetStopWatch - Resets the stopwatch.
 * @property {Function} lapStopWatch - Records a lap in the stopwatch.
 */

/**
 * Custom hook for managing stopwatch functionality.
 * @returns {StopWatch} Stopwatch-related functions and state.
 */
export default function useStopWatch() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<Lap[]>([]);

    const startStopWatch = () => {
        setIsRunning(true);
    }

    const stopStopWatch = () => {
        setIsRunning(false);
    }

    const resetStopWatch = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]);
    }

    const lapStopWatch = () => {
        let newLap = {
            number: laps.length + 1,
            totalTime: elapsedTime,
            timeInterval: elapsedTime,
        };

        if (laps.length > 0) {
            const lastLap = laps[laps.length - 1];
            newLap.timeInterval = elapsedTime - lastLap.totalTime;
        }

        setLaps([...laps, newLap]);
    }

    // Update elapsedTime
    useEffect(() => {
        if (isRunning) {
          const currentTime = Date.now() - elapsedTime;
          const interval = setInterval(() => setElapsedTime(Date.now() - currentTime), STOPWATCH_REFRESH);
      
          return () => {
            clearInterval(interval);
          };
        }
      }, [isRunning]);
      

    return {elapsedTime, isRunning, laps, startStopWatch, stopStopWatch, resetStopWatch, lapStopWatch}
}