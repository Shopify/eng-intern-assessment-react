import React, { useState, useEffect } from 'react';
import Stopwatch from './StopWatch';

const App: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<{ minutes: number; seconds: number }[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLapTimes([]);
  };

  const handleLap = () => {
    const totalSeconds = elapsedTime % 60;
    const totalMinutes = Math.floor(elapsedTime / 60);

    const lapTime = {
      minutes: totalMinutes,
      seconds: totalSeconds,
    };

    setLapTimes((prevLapTimes) => [...prevLapTimes, lapTime]);
  };

  return (
    <Stopwatch
      isRunning={isRunning}
      elapsedTime={elapsedTime}
      lapTimes={lapTimes}
      onStart={handleStart}
      onStop={handleStop}
      onReset={handleReset}
      onLap={handleLap}
    />
  );
};

export default App;
