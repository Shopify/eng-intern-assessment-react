import { useState, useEffect } from 'react';

/**
 * Structure for managing stopwatch state.
 */
interface StopwatchState {
    time: number; // Total time elapsed in tenths of a second
    lapTime: number; // Time for the current lap in tenths of a second
    isRunning: boolean; // Indicates whether the stopwatch is running
    laps: number[]; // Array to store lap times in tenths of a second
}

/**
 * Custom hook to manage the state and behavior of a stopwatch.
 * 
 * @returns {StopwatchState & {start, stop, lap, reset, milliseconds}} - The stopwatch state and control functions.
 */
const useStopwatch = (): StopwatchState & {
    start: () => void; // Function to start the stopwatch
    stop: () => void; // Function to stop the stopwatch
    lap: () => void; // Function to record a lap
    reset: () => void; // Function to reset the stopwatch
    milliseconds: number; // Milliseconds part of the time
} => {
    // State management for time, lap time, running status, and lap times
    const [time, setTime] = useState<number>(0);
    const [lapTime, setLapTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    // Effect to update time and lap time at regular intervals (10 milliseconds)
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
                setLapTime(prevLapTime => prevLapTime + 1);
            }, 10);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    // Control functions for the stopwatch
    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const lap = () => {
        setLaps(prevLaps => [...prevLaps, lapTime]);
        setLapTime(0);
    };
    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLapTime(0);
        setLaps([]);
    };

    // Extracting milliseconds for display purposes
    const milliseconds = time % 10;

    return { time, lapTime, isRunning, laps, milliseconds, start, stop, lap, reset };
};

export default useStopwatch;
