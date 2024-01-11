import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";
import StopWatch from "./StopWatch";
import "./styles.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>(null);

  const startTimer = () => {
    // return early if the timer interval has already been started
    if (intervalId !== null) return;
    setIntervalId(
      setInterval(() => {
        setTime((time) => ++time);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    // clear the interval id too so we know if the interval is running
    setIntervalId(null);
  };

  const clearTimer = () => {
    setTime(0);
  };

  return (
    <div className="stopwatch-container">
      <StopWatch time={time} />
      <div className="buttons">
        <StopWatchButton label="Start" onButtonClick={startTimer} />
        <StopWatchButton label="Stop" onButtonClick={stopTimer} />
        <StopWatchButton label="Clear" onButtonClick={clearTimer} />
      </div>
    </div>
  );
}
