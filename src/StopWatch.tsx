import React, { useState, useEffect, useRef } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10);
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
    setLapTimes([]);
  };

  const handleLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  const formatTime = (centiseconds: number) => {
    const minutes = Math.floor(centiseconds / (100 * 60));
    const seconds = Math.floor((centiseconds / 100) % 60);
    const centis = centiseconds % 100;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formattedCentiseconds = centis < 10 ? `0${centis}` : `${centis}`;

    return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
  };
  return (
    <>
      <div className="box">
        <h1>Stopwatch</h1>
        <div className="time">{formatTime(time)}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '2em' }}>
        <StopWatchButton onClick={handleStart} label="Start" />
        <StopWatchButton onClick={handlePause} label="Pause" />
        <StopWatchButton onClick={resetStopwatch} label="Reset" />
        <StopWatchButton onClick={handleLap} label="Lap" />
      </div>

      <div className="box">
          {lapTimes.map((lapTime, index) => (
            <div key={index}>Lap {index + 1}: {formatTime(lapTime)}</div>
          ))}
        </div>
    </>
  );
}
