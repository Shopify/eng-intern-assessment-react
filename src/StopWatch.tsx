import React, { useState, useEffect, useRef } from "react";
import StopWatchArc from "./StopWatchArc";
import StopWatchButton from "./StopWatchButton";
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
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

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
    let seconds: any = Math.floor(time / 1000);
    let minutes: any = Math.floor(seconds / 60);
    seconds = `0${seconds % 60}`.slice(-2);
    minutes = `0${minutes % 60}`.slice(-2);

    return `${minutes}:${seconds}`;
  };

  const formatMS = (time: number) => {
    const milliseconds = `00${time % 100}`.slice(-2);

    return `${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1 className="stopwatch__heading">Shopify Internship S'24 — Challenge<span className="float-right">✶✶✶</span></h1>
      <div className={`stopwatch__timer 
                      ${elapsedTime === 0 ? "stopwatch__timer--initialize " : ""}
                      ${isRunning ? "stopwatch__timer--active " : ""}
                      ${laps.length > 0 ? "stopwatch__timer--laps" : ""}`}>
        <StopWatchArc />
        <span className="stopwatch__time">
            {formatTime(elapsedTime)}
          <span className="stopwatch__milliseconds">{formatMS(elapsedTime)}</span>
          </span>
        {laps.length > 0 && (
          <div className="stopwatch__laps">
            <ul className="stopwatch__list">
              {laps.map((lap, index) => (
                <li key={index}>
                  Lap {index + 1}: {formatTime(lap)}.{formatMS(lap)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="stopwatch__actions">
        <StopWatchButton onClick={startStopWatch}
                         label="Play"
                         hidden={isRunning}>
          <span className="shape__play">Play</span>
        </StopWatchButton>
        <StopWatchButton onClick={pauseStopwatch}
                         label="Pause"
                         hidden={!isRunning}>
          <span className="shape__pause">Pause</span>
        </StopWatchButton>
        <StopWatchButton onClick={resetStopWatch}
                         label="Reset"
                         hidden={isRunning}>
          Reset
        </StopWatchButton>
        <StopWatchButton onClick={stopWatchLap}
                         label="Lap"
                         hidden={!isRunning}>
          Lap
        </StopWatchButton>
      </div>
    </div>
  );
};

export default Stopwatch;
