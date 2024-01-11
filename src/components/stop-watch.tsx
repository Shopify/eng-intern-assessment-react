import React, { useEffect, useState } from 'react';
import StartButton from './start-button';
import StopButton from './stop-button';
import ResetButton from './reset-button';

export default function StopWatch() {
  const [time, setTime] = useState(0); // state of time elapsed
  const [isRunning, setIsRunning] = useState(false); // state of stopwatch

  // useEffect that updates stopwatch time every 10 milliseconds
  useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (isRunning) intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Calculate minutes from 'time'
  const minutes = Math.floor((time % 360000) / 6000)
    .toString()
    .padStart(2, '0');

  // Calculate secondsfrom 'time'
  const seconds = Math.floor((time % 6000) / 100)
    .toString()
    .padStart(2, '0');

  // Calculate milliseconds from 'time'
  const milliseconds = (time % 100).toString().padStart(2, '0');

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-xl border border-[#27272A]">
      <p className="tabular-nums text-[#FAFAFA] text-5xl">
        {minutes}:{seconds}:{milliseconds}
      </p>
      <div className="flex gap-3">
        <StartButton onClick={handleStart} />
        <StopButton onClick={handleStop} />
        <ResetButton onClick={handleReset} />
      </div>
    </div>
  );
}
