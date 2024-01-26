import React, { useState, useEffect } from "react";

import StopWatchButton from "./StopWatchButton";

const Stopwatch: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startInterval = () => {
      interval = setInterval(() => {
        setTotalTime((currTime) => currTime + 10);
      }, 10);
    };

    if (isRunning) {
      startInterval();
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTotalTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const milliseconds = Math.floor((totalTime % 1000) / 10);
  const seconds = Math.floor((totalTime % 60000) / 1000);
  const minutes = Math.floor(totalTime / 60000);

  const format = (time: number): string => {
    const padZero = (value: number): string =>
      value < 10 ? `0${value}` : `${value}`;

    return `${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
  };

  const createNewLap = () => {
    let newLap: string = format(totalTime);
    setLaps((prevLaps) => [...prevLaps, newLap]);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <span>{format(totalTime)}</span>
      </div>
      <div>
        <StopWatchButton
          action={isRunning ? "Pause" : "Start"}
          onClick={handleStartStop}
        />
        {isRunning ? (
          <StopWatchButton action="Lap" onClick={createNewLap} />
        ) : (
          <StopWatchButton action="Reset" onClick={handleReset} />
        )}
      </div>
      <ul>
        {laps.map((lap) => (
          <li key={lap}>{lap}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
