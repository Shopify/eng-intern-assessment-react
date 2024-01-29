import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';

// StopWatch component - represents all the functions of a standard stopwatch
const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<{ lapNumber: number; lapTime: number }[]>([]);
  
  // Used to store lap start times and lap number
  const lapStartTimeRef = useRef<number | null>(null);
  const lapNumberRef = useRef<number>(1);

  // Hook that updates the time when the stopwatch starts (update interval is 1 ms).
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      const startTime = Date.now() - elapsedTime;

      // Update elapsed time at a regular interval
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setElapsedTime(elapsed);
      }, 1);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, elapsedTime]);

  // Event that starts the stopwatch
  const handleStart = () => {
    setIsRunning(true);
    lapStartTimeRef.current = Date.now();
  };

  // Event that stops the stopwatch
  const handleStop = () => {
    setIsRunning(false);
  };

  // Event that resets the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    lapNumberRef.current = 1;
    lapStartTimeRef.current = null;
  };

  // Event that records a lap only when the stopwatch is running. It records the difference from the last saved start time.
  const handleLap = () => {
    if (isRunning && lapStartTimeRef.current !== null) {
      const lapTime = Date.now() - lapStartTimeRef.current;
      const lapNumber = lapNumberRef.current;

      lapNumberRef.current = lapNumber + 1;

      setLaps((prevLaps) => [
        { lapNumber, lapTime },
        ...prevLaps.slice(0, 9), 
      ]);

      lapStartTimeRef.current = Date.now();
    }
  };

  // Format the time in as 00:00:00.000 (hh:mm:ss.ms)
  const formatTime = (time: number) => {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div>
      <h1>{formatTime(elapsedTime)}</h1>
      <StopWatchButton onClick={handleStart} label="Start" />
      <StopWatchButton onClick={handleStop} label="Stop" />
      <StopWatchButton onClick={handleReset} label="Reset" />
      <StopWatchButton onClick={handleLap} label="Lap" />

      {laps.length > 0 && (
        <div>
          <h2>Lap Times</h2>
          <ul>
            {laps.map(({ lapNumber, lapTime }, index) => (
              <li key={index}>{`Lap ${lapNumber}: ${formatTime(lapTime)}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatch;