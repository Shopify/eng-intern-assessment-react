import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1); // Increase by 0.1 seconds
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startStopWatch = () => {
    setIsRunning(!isRunning);
  };

  const stopStopWatch = () => {
    setIsRunning(false);
  };

  const resetStopWatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  
    return (
      <div className="stopwatch-container">
        <h1 className="stopwatch">{formatTime(time)}</h1>
        <div className="button-container">
          <StopWatchButton onClick={startStopWatch} label={isRunning ? 'Stop' : 'Start'} />
          <StopWatchButton onClick={recordLap} label="Lap" disabled={!isRunning} />
          <StopWatchButton onClick={resetStopWatch} label="Reset" />
        </div>
        {laps.length > 0 && (
          <div className="laps-container">
            <h2>Laps</h2>
            <ul className="lap-list">
              {laps.map((lap, index) => (
                <li key={index} className="lap-item">{formatTime(lap)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
};
    