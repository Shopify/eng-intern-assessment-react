import React, { useEffect, useRef, useState } from 'react';
import { formatTime } from './utils';
import StopWatchButton from './StopWatchButton';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startTime = useRef<number>(0);

  const onToggleStart = () => setIsRunning((isRunning) => !isRunning);
  const onReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const onLap = () => {
    if (!isRunning) {
      return;
    }

    setLaps((laps) => [...laps, time]);
  };

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (isRunning) {
      startTime.current = Date.now() - time;
      timer = setInterval(() => {
        setTime(Date.now() - startTime.current);
      }, 1);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className='stopwatch'>
      <div className='container'>
        <h1>🛑⌚ StopWatch</h1>
        <div className='display' data-testid='display'>
          {formatTime(time)}
        </div>
        <div className='buttons'>
          <StopWatchButton onClick={onToggleStart}>
            {isRunning ? 'Stop' : 'Start'}
          </StopWatchButton>
          <StopWatchButton onClick={onLap}>Lap</StopWatchButton>
          <StopWatchButton className='reset' onClick={onReset}>
            Reset
          </StopWatchButton>
        </div>
      </div>
      <div className='lap-list'>
        {laps.length > 0 && <h2>Laps</h2>}
        <ul data-testid='lap-list'>
          {laps.map((lap) => (
            <li key={lap}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
