import React, { useState, useEffect } from 'react';
import './StopWatch.css'; 

export default function StopWatch() {
  const [start, setStart] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isTiming) {
      setStart(Date.now() - elapsed);
      timerId = setInterval(() => {
        setElapsed(Date.now() - start);
      }, 10);
    }

    return () => clearInterval(timerId);
  }, [isTiming, elapsed, start]);

  const time = (totalMilliseconds: number): string => {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const milliseconds = totalMilliseconds % 1000;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const formattedMilliseconds = milliseconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  const startTimer = () => {
    setIsTiming(true);
  };

  const stop = () => {
    setIsTiming(false);
  };

  const reset= () => {
    setIsTiming(false);
    setStart(0);
    setElapsed(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps([...laps, elapsed]);
  };

  return (
    <div>
      <h1>StopWatch</h1>
    <div className="stopwatch-container">
      <div className="stopwatch-time">{time(elapsed)}</div>
      <div className="stopwatch-buttons">
        <button onClick={startTimer} className="start-button">
          Start
        </button>
        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
        <button onClick={lap} className="lap-button">
          Lap
        </button>
      </div>
      <ul className="lap-list">
        {laps.map((lap, index) => (
          <li key={index} className="lap-item">{`Lap ${index + 1}: ${time(lap)}`}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}
