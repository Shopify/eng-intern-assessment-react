import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const totalSeconds = elapsedTime % 60;
    const totalMinutes = Math.floor(elapsedTime / 60);

    setSeconds(totalSeconds);
    setMinutes(totalMinutes);
  }, [elapsedTime]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleLap = () => {
    // Do something with the lap time
  };

  return (
    <div>
      <h1>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</h1>
      <StopWatchButton
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
        onLap={handleLap}
      />
    </div>
  );
};

export default StopWatch;