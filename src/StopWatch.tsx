import React, { useState, useEffect, useRef } from 'react';

import StopWatchButton from './StopWatchButton';

import './StopWatch.css';

export default function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [lastLapTime, setLastLapTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  //Interval  is defined outside of hooks, advoiding redeclaration & potential bugs
  const interval = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (isActive) {
      interval.current = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      // clear intervals when components unmounted and isActive changes
      clearInterval(interval.current);
    }

    return () => {
      // clear intervals when components unmounted and isActive changes
      if (interval.current) clearInterval(interval.current);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setLastLapTime(time);
    }
  };

  const handleLap = () => {
    // Handle Lap
    if (isActive) {
      const lapTime = time - lastLapTime;
      setLaps([...laps, lapTime]);
      setLastLapTime(time);
    }
  };
  const handleReset = () => {
    // Handle Reset
    setTime(0);
    setLaps([]);
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
    <div className='stopwatch-container'>
      <div className='stopwatch-head'>
        <h1 className='stopwatch-title'>StopWatch</h1>
        <span className='stopwatch-display'>{formatTime(time)}</span>
        <div className='stopwatch-buttons'>
          <StopWatchButton
            onClick={handleStartStop}
            label={isActive ? 'Stop' : 'Start'}
          />
          <StopWatchButton
            onClick={!isActive ? handleReset : handleLap}
            label={!isActive ? 'Reset' : 'Lap'}
          />
        </div>
      </div>
      {laps.length > 0 && (
        <ul className='lap-container'>
          {laps.map((lap, index) => (
            <li
              key={index}
              className='lap-item'
            >
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
