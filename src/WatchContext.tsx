import React, { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import "./StopWatchInterface"

export const WatchContext = createContext<ContextType | null>(null);

export const WatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [lapStartTime, setLapStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState<LapType[]>([]);
    const [slowestLap, setSlowestLap] = useState<number | null>(null);
    const [fastestLap, setFastestLap] = useState<number | null>(null);

    // Handler for starting the stopwatch
    const handleStart = useCallback(() => {
        setIsRunning(true);
        setStartTime(Date.now() - elapsedTime);
        setLapStartTime(Date.now() - elapsedTime);
    }, [elapsedTime]);

    // Handler for stopping the stopwatch
    const handleStop = useCallback(() => {
        setIsRunning(false);
    }, []);

    // Handler for recording a lap
    const handleLap = useCallback(() => {
        if (isRunning) {
          const lapTime = Date.now() - (lapStartTime ?? 0);
          const lap = { elapsedTime: lapTime };
          setLaps([...laps, lap]);

          // Updating the slowest and fastest lap times
          if (!slowestLap || lapTime > slowestLap) setSlowestLap(lapTime);
          if (!fastestLap || lapTime < fastestLap) setFastestLap(lapTime);

          setLapStartTime(Date.now())
        }
    }, [isRunning, startTime, laps, slowestLap, fastestLap]);

    // Handler for resetting the stopwatch
    const handleReset = useCallback(() => {
        setIsRunning(false);
        setStartTime(null);
        setElapsedTime(0);
        setLaps([]);
        setSlowestLap(null);
        setFastestLap(null);
    }, []);

    // Effect to update the elapsed time at an interval of 10 ms
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
          interval = setInterval(() => {
            setElapsedTime(Date.now() - (startTime ?? 0));
          }, 10);
        } else {
          interval && clearInterval(interval);
        }

        return () => interval && clearInterval(interval);
    }, [isRunning, startTime]);

    // Memoizing the context value to optimize performance
    const contextValue = useMemo(() => ({
        isRunning,
        elapsedTime,
        laps,
        handleStart,
        handleStop,
        handleLap,
        handleReset,
        slowestLap,
        fastestLap
    }), [isRunning, elapsedTime, laps, handleStart, handleStop, handleLap, handleReset, slowestLap, fastestLap]);

    return (
        <WatchContext.Provider value={contextValue}>
            {children}
        </WatchContext.Provider>
    );
};
