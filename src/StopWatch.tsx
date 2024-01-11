import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handlePause = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
    <div className="box">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(time)}</div>
    </div>
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', paddingTop: '2em'}}>
        <StopWatchButton onClick={handleStart} label="Start" />
        <StopWatchButton onClick={handlePause} label="Pause" />
        <StopWatchButton onClick={resetStopwatch} label="Reset" />
    </div>
    </>
  );
}
