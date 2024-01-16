import React from 'react';
import StopWatchButton from './StopWatchButton';
import { useState, useEffect } from 'react';

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<String[]>([]);
  const [prevLapTime, setPrevLapTime] = useState(0);

  let interval: NodeJS.Timer | undefined;
  let minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2);
  let seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
  let milliseconds = ('0' + ((time / 10) % 100)).slice(-2);

  const start = () => {
    if (isRunning) {
      setIsRunning(false);
    } else if (!isRunning) {
      setIsRunning(true);
    }
  };

  const reset = () => {
    if (!isRunning) {
      setTime(0);
      setLaps([]);
      setPrevLapTime(0); // Reset the previous lap time
    }
  };

  const lap = () => {
    const currentLapTime = time - prevLapTime;
    setPrevLapTime(time); // Update the previous lap time
    setLaps([...laps, formatTime(currentLapTime)]);
  };

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (lapTime: number) => {
    const lapMinutes = ('0' + Math.floor((lapTime / 60000) % 60)).slice(-2);
    const lapSeconds = ('0' + Math.floor((lapTime / 1000) % 60)).slice(-2);
    const lapMilliseconds = ('0' + ((lapTime / 10) % 100)).slice(-2);
    return `${lapMinutes}:${lapSeconds}:${lapMilliseconds}`;
  };

  return (
    <div className='stopwatch-container'>
      <div className="stopwatch">
        <div className="time-text">
          <p>{minutes}:{seconds}:{milliseconds}</p>
        </div>
        <StopWatchButton start={start} reset={reset} lap={lap} isRunning={isRunning}/>
      </div>
      <div className="laps-container">
        {laps != null && laps.length > 0 && (
          <div className="laps-grid">
            {laps.map((lap, i) => <div className='lap'><span>{i + 1} | {lap}</span></div>)}
          </div>
        )}
      </div>
    </div>
  );
}
