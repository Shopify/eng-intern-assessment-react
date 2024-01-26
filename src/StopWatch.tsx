import React, { useState, useEffect } from "react";

const Stopwatch: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

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
  };

  const milliseconds = Math.floor((totalTime % 1000) / 10);
  const seconds = Math.floor((totalTime % 60000) / 1000);
  const minutes = Math.floor(totalTime / 60000);

  const padZero = (value: number): string =>
    value < 10 ? `0${value}` : `${value}`;

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>
        <span>{`${padZero(minutes)}:${padZero(seconds)}.${padZero(
          milliseconds
        )}`}</span>
      </div>
      <div>
        <button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
