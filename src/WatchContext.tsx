import React, { createContext, useCallback, useMemo, useState, useEffect } from 'react';

export const WatchContext = createContext<ContextType | null>(null);

interface LapType {
  elapsedTime: number;
}

interface ContextType {
  isRunning: boolean;
  elapsedTime: number;
  laps: LapType[];
  slowestLap: number;
  fastestLap: number;
  handleStart: () => void;
  handleStop: () => void;
  handleLap: () => void;
  handleReset: () => void;
}

export const WatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [lapStartTime, setLapStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [laps, setLaps] = useState<LapType[]>([]);
    const [slowestLap, setSlowestLap] = useState<number | null>(null);
    const [fastestLap, setFastestLap] = useState<number | null>(null);

    const handleStart = useCallback(() => {
        setIsRunning(true);
        setStartTime(Date.now() - elapsedTime);
        setLapStartTime(Date.now() - elapsedTime);
    }, [elapsedTime]);

    const handleStop = useCallback(() => {
        setIsRunning(false);
    }, []);

    const handleLap = useCallback(() => {
        if (isRunning) {
          const lapTime = Date.now() - (lapStartTime ?? 0);
          const lap = { elapsedTime: lapTime };
          setLaps([...laps, lap]);

          if (!slowestLap || lapTime > slowestLap) setSlowestLap(lapTime);
          if (!fastestLap || lapTime < fastestLap) setFastestLap(lapTime);

          setLapStartTime(Date.now())
        }
    }, [isRunning, startTime, laps, slowestLap, fastestLap]);

    const handleReset = useCallback(() => {
        setIsRunning(false);
        setStartTime(null);
        setElapsedTime(0);
        setLaps([]);
        setSlowestLap(null);
        setFastestLap(null);
    }, []);

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
