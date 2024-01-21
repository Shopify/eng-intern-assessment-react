import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface StopWatchButtonProps {
  elapsed: number;
  setElapsed: Dispatch<SetStateAction<number>>;
}

export default function StopWatchButton({ elapsed, setElapsed }: StopWatchButtonProps) {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      const startTime = Date.now() - elapsed;
      interval = setInterval(() => {
        const newElapsed = Date.now() - startTime;
        setElapsed(newElapsed);
      }, 10); // Updating every 10 milliseconds for precision
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
    setIsRunning(!isRunning);
  };

  return (
    <>  
      <div>{formatTime(elapsed)}</div>
      <button onClick={handleStartStopClick}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button>Lap</button>
      <button>Reset</button>
    </>
  );
}
