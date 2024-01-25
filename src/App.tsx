import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [timePassed, setTimePassed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimePassed((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && timePassed !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timePassed]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTimePassed(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <StopWatch timePassed={timePassed} />
      <StopWatchButton action="Start" handleClick={handleStart} />
      <StopWatchButton action="Stop" handleClick={handleStop} />
      <StopWatchButton action="Reset" handleClick={handleReset} />
    </div>
  );
}
