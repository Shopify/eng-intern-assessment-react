import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout;

    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      timer = setInterval(() => {
        const newElapsedTime = Date.now() - startTime;
        setElapsedTime(newElapsedTime);
      }, 25); // delay in milliseconds for callback function
    }

    return () => clearInterval(timer);
  }, [isRunning, elapsedTime]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const lapStopwatch = () => {
    const lapTime = Date.now() - (Date.now() - elapsedTime);
    setLaps([...laps, lapTime]); // combine old laps with new lap
  };

  return (
    <div>
      <div>{formatTime(elapsedTime)}</div>
      <StopWatchButton
        onStart={startStopwatch}
        onStop={stopStopwatch}
        onReset={resetStopwatch}
        onLap={lapStopwatch}
        isRunning={isRunning}
      />
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}

// format time 
function formatTime(milliseconds: number) {
  const date = new Date(milliseconds);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const millisecondsStr = date.getMilliseconds().toString().padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${millisecondsStr}`;
}
