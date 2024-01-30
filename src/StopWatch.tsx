import React, { useState, useEffect, useRef } from "react";
import StopwatchButton from "./StopWatchButton";
import "./styles/stopwatch.css";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [laps, setLaps] = useState<Array<number>>([]);
  const intervalRef = useRef<null | NodeJS.Timer>(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, elapsedTime]);

  const startStopWatch = () => {
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetStopWatch = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const stopWatchLap = () => {
    setLaps([...laps, elapsedTime]);
  };

  const formatTime = (time: number) => {
    const milliseconds = `00${time % 100}`.slice(-2);
    let seconds: any = Math.floor(time / 1000);
    let minutes: any = Math.floor(seconds / 60);
    seconds = `0${seconds % 60}`.slice(-2);
    minutes = `0${minutes % 60}`.slice(-2);

    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch__head">
        <div className="stopwatch__timer">{formatTime(elapsedTime)}</div>
        <StopwatchButton onClick={startStopWatch} hidden={isRunning}>
          Start
        </StopwatchButton>
        <StopwatchButton onClick={pauseStopwatch} hidden={!isRunning}>
          Pause
        </StopwatchButton>
        <StopwatchButton onClick={resetStopWatch} hidden={isRunning}>
          Reset
        </StopwatchButton>
        <StopwatchButton onClick={stopWatchLap} hidden={!isRunning}>
          Lap
        </StopwatchButton>
      </div>
      {laps.length > 0 && (
        <ul className="stopwatch__laps">
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stopwatch;
