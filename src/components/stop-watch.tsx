import React, { useEffect, useState } from 'react';
import StartButton from './start-button';
import PauseButton from './pause-button';
import StopButton from './stop-button';

export default function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    if (isRunning && !isPaused) {
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
    } else if (!isRunning && !isPaused) {
      clearInterval(intervalId);
      setTime(0);
    } else if (isPaused) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, isPaused]);

  const minutes = Math.floor((time % 360000) / 6000)
    .toString()
    .padStart(2, '0');

  const seconds = Math.floor((time % 6000) / 100)
    .toString()
    .padStart(2, '0');

  const milliseconds = (time % 100).toString().padStart(2, '0');

  const handleStartStopwatch = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseStopwatch = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const handleStopStopwatch = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="tabular-nums text-[#FAFAFA] text-5xl">
        {minutes}:{seconds}:{milliseconds}
      </p>
      <div className="flex gap-3">
        {isRunning ? <PauseButton onClick={handlePauseStopwatch} /> : <StartButton onClick={handleStartStopwatch} />}
        <StopButton onClick={handleStopStopwatch} />
      </div>
    </div>
  );
}
