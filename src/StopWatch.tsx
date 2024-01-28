import React, { useState } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  // State to track elapsed time in seconds
  const [time, setTime] = useState<number>(0);

  // State to track elapsed milliseconds within a second
  const [milliseconds, setMilliseconds] = useState<number>(0);

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

  return(
    <div className="stopwatch" data-testid="stopwatch">
    <div className="time-display" data-testid="time-display">{formatTime(time, milliseconds)}</div>
    <StopWatchButton
    />
  </div>
  )
}
