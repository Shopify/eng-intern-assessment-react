import { useState, useEffect } from 'react';

/**
 * @author Harsh Kothari
 * @returns time, isActive, handleStart, handleStop, handleReset, handleLaps, laps
 */
export default function useStopwatch(): {
    time: number;
    isActive: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLaps: () => void;
    laps: number[];
} {
    const [time, setTime] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false); // used for starting and stopping time
    const [laps, setLaps] = useState<number[]>([]);

    /*
        This useEffect is triggered in two instances:
        onMount: it checks if the time is active (start button is pressed or not)
        isActive state: every time start button or stop button is clicked, it triggers and conditionally determines whether to start a new interval or clear one
    */
    useEffect(() => {
        let interval:ReturnType<typeof setInterval> | null = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((t) => t + 10);
            }, 10);
            // 1000 is 1 second, therefore every 10 milliseconds, we update the time so it looks fast
        }

        return () => {
            if (interval) clearInterval(interval);
        }; // on unmount, clear the interval 
    }, [isActive]);

    const handleStart = (): void => setIsActive(true); // onClick of the start button, we have to start an interval
    const handleStop = (): void => setIsActive(false); // onClick of the 
    const handleReset = (): void => {
        setTime(0);
        setLaps([]);
        setIsActive(false);
    }
    const handleLaps = (): void => setLaps(prevLaps => [...prevLaps, time]); // when you click lap button, we add the current time to the array of laps

    return { time, isActive, handleStart, handleStop, handleReset, handleLaps, laps};
}