import React, { useState } from 'react';

export default function App() {
  const [isLive, setIsLive] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

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

  return <div></div>;
}
