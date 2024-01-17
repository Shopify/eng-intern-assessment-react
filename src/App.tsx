import React, { useState } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './styles.css';

export default function App() {
  /* hoisted all state and state handlers to App.tsx
   * to modularize code and make it easier to test
   * by just rendering <App /> component in Stopwatch.test.js
   */
  const [isLive, setIsLive] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>(); // stores reference to interval so that it may be cleared

  const startStopwatch = () => {
    setIsLive(true);
    const startTime = Date.now() - time;
    const interval = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 10);

    setIntervalId(interval);
    return () => {
      clearInterval(interval);
    };
  };

  const stopStopwatch = () => {
    setIsLive(false);
    clearInterval(intervalId);
  };

  const resetStopwatch = () => {
    setIsLive(false);
    clearInterval(intervalId);
    setTime(0);
    setLaps([]);
  };

  const addStopwatchLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <div className='main-wrapper'>
      <StopWatchButton
        isLive={isLive}
        onStart={startStopwatch}
        onStop={stopStopwatch}
        onReset={resetStopwatch}
        onLap={addStopwatchLap}
      />
      <StopWatch time={time} laps={laps} />
    </div>
  );
}
