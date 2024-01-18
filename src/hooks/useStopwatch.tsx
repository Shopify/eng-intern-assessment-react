import { useState, useEffect } from 'react';

export default function useStopwatch(): {
    // returns time, isActive, handleStart, handleStop, handleReset
    time: number;
    isActive: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
} {
    const [time, setTime] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);

    /*
        This useEffect is triggered three times:
        onMount: it checks if the time is active (start button is pressed or not)
        isActive state: every time start button or stop button is clicked, it triggers and conditionally determines whether to start a new interval or clear one
        time state: time is updated 
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
        };
    }, [isActive]);

    const handleStart = (): void => setIsActive(true); 
    const handleStop = (): void => setIsActive(false);
    const handleReset = (): void => setTime(0);

    return { time, isActive, handleStart, handleStop, handleReset };
}