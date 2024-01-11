import React, { useEffect, useRef, useState } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import LapList from './LapList';

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
    <div>
      <h1>🛑⌚</h1>
      <StopWatch time={time} />
      <StopWatchButton onClick={onToggleStart}>
        {isRunning ? 'Stop' : 'Start'}
      </StopWatchButton>
      <StopWatchButton onClick={onLap}>Lap</StopWatchButton>
      <StopWatchButton onClick={onReset}>Reset</StopWatchButton>
      <LapList laps={laps} />
    </div>
  );
}
