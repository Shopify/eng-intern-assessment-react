import React, { useState } from 'react';
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

// renders the stopwatch and has all the functionality
export default function App() {
    const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      const id = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);

      setIsRunning(true);
      setIntervalId(id);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div>
      <StopWatch time={time} laps={laps} />
      <StopWatchButton
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
      />
    </div>
  );
}