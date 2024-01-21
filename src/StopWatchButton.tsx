import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface StopWatchButtonProps {
  elapsed: number;
  setElapsed: Dispatch<SetStateAction<number>>;
}

export default function StopWatchButton({ elapsed, setElapsed }: StopWatchButtonProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [lapStartTime, setLapStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      const startTime = Date.now() - elapsed;
      interval = setInterval(() => {
        const newElapsed = Date.now() - startTime;
        setElapsed(newElapsed);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, elapsed, setElapsed]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const pad = (value: number) => (value < 10 ? `0${value}` : value);

    return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
  };

  const handleStartStopClick = () => {
    if (isRunning) {
      setIsRunning(false);
      setLapStartTime(null);
    } else {
      setIsRunning(true);
      if (lapStartTime === null) {
        setLapStartTime(Date.now() - elapsed);
      }
    }
  };

  const handleLapClick = () => {
    if (lapStartTime !== null) {
      const lapTime = Date.now() - lapStartTime;
      setLapTimes([...lapTimes, lapTime]);
      setLapStartTime(Date.now());
    }
  };

  const handleResetClick = () => {
    setIsRunning(false);
    setElapsed(0);
    setLapTimes([]);
    setLapStartTime(null);
  };

  return (
    <>  
      <div>{formatTime(elapsed)}</div>
      <button onClick={handleStartStopClick}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleLapClick}>Lap</button>
      <button onClick={handleResetClick}>Reset</button>

      <div>
        <h2>Lap Times</h2>
        <ul>
          {lapTimes.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
