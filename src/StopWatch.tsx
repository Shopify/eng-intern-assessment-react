import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  // State to track the stopwatch status
  const [isRunning, setIsRunning] = useState(false);

  // State to store lap times
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  // State to track the time of the last lap
  const [lastLapTime, setLastLapTime] = useState<number>(0);

  // State to track elapsed time in seconds
  const [time, setTime] = useState<number>(0);

  // State to track elapsed milliseconds within a second
  const [milliseconds, setMilliseconds] = useState<number>(0);

  // Function to handle the start/stop button click
  const onStartStopClick = () => {
    setIsRunning(!isRunning);
  };

  // useEffect to update time and milliseconds when running
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) =>
          prevMilliseconds === 99 ? 0 : prevMilliseconds + 1
        );

        if (milliseconds === 99) {
          setTime((prevTime) => prevTime + 1);
        }
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, milliseconds]);

  // Function to format time as "hh:mm:ss.SS"
  const formatTime = (seconds: number, ms: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    const formattedMilliseconds = String(ms).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  // Function to handle lap button click
  const handleLapClick = () => {
  };

  // Function to handle reset button click
  const handleResetClick = () => {
    setTime(0);
    setMilliseconds(0);
    setLapTimes([]);
    setLastLapTime(0);
  };

  return(
    <div className="stopwatch" data-testid="stopwatch">
    <div className="time-display" data-testid="time-display">{formatTime(time, milliseconds)}</div>
    <StopWatchButton
      isRunning={isRunning}
      onStartStopClick={onStartStopClick}
      onLapClick={handleLapClick}
      onResetClick={handleResetClick}
    />
  </div>
  )
}
