import React, { useState, useEffect } from "react";

// import "./styles.css";

import StopWatchButton from "./StopWatchButton";

import { formatTime } from "./utils";

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

  const createNewLap = () => {
    let newLap: string = formatTime(totalTime);
    setLaps((prevLaps) => [...prevLaps, newLap]);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <span>{formatTime(totalTime)}</span>
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
      <ol reversed>
        {laps
          .slice()
          .reverse()
          .map((lap) => (
            <li key={lap}>{lap}</li>
          ))}
      </ol>
    </div>
  );
};

export default Stopwatch;
