import { useState, useEffect } from 'react';

/**
 * Custom hook for managing a mini stopwatch.
 * 
 * @returns {{ miniTime: number, isRunning: boolean, startMini: () => void, stopMini: () => void, resetMini: () => void }}
 */
const useMiniStopwatch = () => {
    // State management for miniTime and isRunning
    const [miniTime, setMiniTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Effect to update miniTime at regular intervals (10 milliseconds) when running
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setMiniTime(prevTime => prevTime + 1);
            }, 10);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    // Functions for controlling the mini stopwatch
    const startMini = () => setIsRunning(true);
    const stopMini = () => setIsRunning(false);
    const resetMini = () => {
        setIsRunning(false);
        setMiniTime(0);
    };

    return { miniTime, isRunning, startMini, stopMini, resetMini };
};

export default useMiniStopwatch;
