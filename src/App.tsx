import React, { useEffect, useRef, useState } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import LapList from './LapList';
import './App.css';

export default function App() {
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
    <main>
      <div className='container'>
        <h1>🛑⌚ StopWatch</h1>
        <StopWatch className='display' time={time} />
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
      <LapList className='lap-list' laps={laps} />
    </main>
  );
}
