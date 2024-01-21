import { useState, useEffect } from 'react';

// Define the structure of the stopwatch state
interface StopwatchState {
    time: number; // Total time elapsed
    lapTime: number; // Time for the current lap
    isRunning: boolean; // Whether the stopwatch is running
    laps: number[]; // Array to store lap times
}

// The hook returns the stopwatch state and control functions
const useStopwatch = (): StopwatchState & {
    start: () => void; // Function to start the stopwatch
    stop: () => void; // Function to stop the stopwatch
    lap: () => void; // Function to record a lap
    reset: () => void; // Function to reset the stopwatch
    milliseconds: number; // Milliseconds part of the time
} => {
    // State for the total time, lap time, running status, and laps array
    const [time, setTime] = useState<number>(0);
    const [lapTime, setLapTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [laps, setLaps] = useState<number[]>([]);

    // Effect to update the time and lap time every 10 milliseconds
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

    // Functions to control the stopwatch
    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const lap = () => {
        setLaps(prevLaps => [...prevLaps, lapTime]);
        setLapTime(0);
    };
    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    // Calculate milliseconds from time
    const milliseconds = time % 10;
    return { time, lapTime, isRunning, laps, milliseconds, start, stop, lap, reset};
};

export default useStopwatch;
