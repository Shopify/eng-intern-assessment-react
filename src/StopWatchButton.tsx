import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import "./Style.css";

interface StopWatchButtonProps {
  elapsed: number;
  setElapsed: Dispatch<SetStateAction<number>>;
}

export default function StopWatchButton({ elapsed, setElapsed }: StopWatchButtonProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [lapStartTime, setLapStartTime] = useState<number | null>(null);

  const lapTimesContainerRef = useRef<HTMLDivElement>(null);

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

      // Scroll to the bottom after adding a new lap time
      if (lapTimesContainerRef.current) {
        lapTimesContainerRef.current.scrollTop = lapTimesContainerRef.current.scrollHeight;
      }
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
      <div className="timer-container">
        <div className="timer-box">{formatTime(elapsed)}</div>
      </div>
      <button onClick={handleStartStopClick}>
        {isRunning ? 'STOP' : 'START'}
      </button>
      <button onClick={handleLapClick}>LAP</button>
      <button onClick={handleResetClick}>RESET</button>
      
      <h2 className="lap-times-heading">L A P S</h2>
      <div className="lap-times-container" ref={lapTimesContainerRef}>
        <ul className="lap-times-list">
          {lapTimes.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
