import React, { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

interface LapTime {
    minutes: number;
    seconds: number;
  }

const StopWatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);

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
    setLapTimes([]);

  };

  const handleLap = () => {
    const totalSeconds = elapsedTime % 60;
    const totalMinutes = Math.floor(elapsedTime / 60);

    const lapTime: LapTime = {
      minutes: totalMinutes,
      seconds: totalSeconds,
    };

    setLapTimes((prevLapTimes) => [...prevLapTimes, lapTime]);
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
      {lapTimes.map((lapTime, index) => (
        <p key={index}>{`Lap ${index+1}: ${String(lapTime.minutes).padStart(2, '0')}:${String(lapTime.seconds).padStart(2, '0')}`}</p>
      ))}
    </div>
  );
};

export default StopWatch;