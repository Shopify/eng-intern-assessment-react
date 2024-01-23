import React, { useState, useEffect } from 'react';

import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setLastLapTime(time);
    }
  };

  const handleReset = () => {
    if (isActive) {
      const lapTime = time - lastLapTime;
      setLaps([...laps, lapTime]);
      setLastLapTime(time);
    } else {
      setTime(0);
      setLaps([]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);
    return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}.${(
      '0' + milliseconds
    ).slice(-2)}`;
  };

  return (
    <div>
      <div>
        <h1>StopWatch</h1>
        <span>{formatTime(time)}</span>
        <div>
          <StopWatchButton
            onClick={handleStartStop}
            label={isActive ? 'Stop' : 'Start'}
          />
          <StopWatchButton
            onClick={handleReset}
            label={!isActive ? 'Reset' : 'Lap'}
          />
        </div>
      </div>
      {laps.length > 0 && (
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
