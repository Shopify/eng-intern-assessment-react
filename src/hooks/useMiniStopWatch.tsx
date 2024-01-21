// hooks/useMiniStopwatch.js
import { useState, useEffect } from 'react';

const useMiniStopwatch = () => {
    const [miniTime, setMiniTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

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

    const startMini = () => setIsRunning(true);
    const stopMini = () => setIsRunning(false);
    const resetMini = () => {
        setIsRunning(false);
        setMiniTime(0);
    };

    return { miniTime, isRunning, startMini, stopMini, resetMini };
};

export default useMiniStopwatch;
