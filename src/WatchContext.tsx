import React, { createContext, useCallback, useMemo, useState, useEffect } from 'react';  

export const WatchContext = createContext<ContextType | null>(null);

interface LapType {
    time: number;
    milliseconds: number;
}

// Define the shape of context data here
interface ContextType {
  isRunning: boolean;
  time: number;
  milliseconds: number;
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
    const [time, setTime] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const [laps, setLaps] = useState([]);
    const [slowestLap, setSlowestLap] = useState(null);
    const [fastestLap, setFastestLap] = useState(null);
    const [lapStartTime, setLapStartTime] = useState<number | null>(0);
    const [lapStartMilliseconds, setLapStartMilliseconds] = useState<number | null>(0);

    // Start the stopwatch
    const handleStart = useCallback(() => {
        setIsRunning(true);
    }, []);

    // Stop the stopwatch
    const handleStop = useCallback(() => {
        setIsRunning(false);
    }, []);

    // Record a lap
    const handleLap = useCallback(() => {
        console.log(lapStartTime)
        if (isRunning) {
          const lapElapsedTime = time - (lapStartTime || 0); // Calculate elapsed time for the lap
          const lapElapsedMilliseconds = milliseconds - (lapStartMilliseconds || 0); // Capture the current milliseconds
      
          // Create a lap object with "time" and "milliseconds" fields
          const lapObject = {
            time: lapStartTime,
            milliseconds: lapStartMilliseconds,
          };
      
          setLaps([...laps, lapObject]);
      
          // Update the lap start time with the current lap's end time
          setLapStartTime(time);
          setLapStartMilliseconds(milliseconds);
      
          // Check if it's the first lap or if it's slower than the current slowest lap
          if (laps.length === 0 || lapElapsedTime > slowestLap) {
            setSlowestLap(lapElapsedTime);
          }
      
          // Check if it's the first lap or if it's faster than the current fastest lap
          if (laps.length === 0 || lapElapsedTime < fastestLap) {
            setFastestLap(lapElapsedTime);
          }
        }
        setLapStartTime(0)
        setLapStartMilliseconds(0)

        console.log(laps)
      }, [isRunning, lapStartTime, milliseconds, laps, slowestLap, fastestLap]);
      

    // Reset the stopwatch
    const handleReset = useCallback(() => {
        setIsRunning(false);
        setMilliseconds(0);
        setLapStartTime(0)
        setLapStartMilliseconds(0)
        setTime(0);
        setLaps([]);
    }, []);

    // Effect to handle the lap timer, do that
    // Effect to handle the timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
      
        if (isRunning) {
          interval = setInterval(() => {
            // Increment milliseconds every 10 milliseconds
            setMilliseconds((prevMilliseconds) =>
              prevMilliseconds === 990 ? 0 : prevMilliseconds + 10
            );
            setLapStartMilliseconds((prevMilliseconds) =>
              prevMilliseconds === 990 ? 0 : prevMilliseconds + 10
            );
      
            // Increment seconds every 1000 milliseconds
            if (milliseconds === 990) {
              setTime((prevTime) => prevTime + 1);
            }
            if (lapStartMilliseconds === 990) {
                setLapStartTime((prevTime) => prevTime + 1);
              }
          }, 10); // Run every 10 milliseconds for milliseconds precision
        } else if (!isRunning && time !== 0) {
          clearInterval(interval);
        }
      
        return () => clearInterval(interval);
    }, [isRunning, time, milliseconds]);

    // The value provided to the context consumers
    const contextValue = useMemo(() => ({
        isRunning,
        time,
        milliseconds,
        laps,
        handleStart,
        handleStop,
        handleLap,
        handleReset,
        slowestLap,
        fastestLap
    }), [isRunning, time, laps, handleStart, handleStop, handleLap, handleReset, slowestLap, fastestLap]);

    return (
        <WatchContext.Provider value={contextValue}>
            {children}
        </WatchContext.Provider>
    );
};
//