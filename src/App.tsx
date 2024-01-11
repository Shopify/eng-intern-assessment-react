import React, { useEffect, useRef, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./App.css";

export default function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | undefined>(undefined);

  const toggleStopWatch = () => {
    if (!isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      window.clearInterval(intervalRef.current);
    }
    setIsRunning(!isRunning);
  };

  const resetStopWatch = () => {
    setIsRunning(false);
    setTime(0);
    window.clearInterval(intervalRef.current);
  };

  const lapStopWatch = () => {
    return;
  };

  return (
    <div>
      <h1>StopWatch</h1>
      <StopWatch time={time} />
      <div className="btn-container">
        <StopWatchButton handleClick={toggleStopWatch} label="toggle" />
        <StopWatchButton handleClick={resetStopWatch} label="reset" />
        <StopWatchButton handleClick={lapStopWatch} label="lap" />
      </div>
    </div>
  );
}
