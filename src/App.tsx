import React, { useState, useEffect } from "react";
import Stopwatch from "./StopWatch";
import StopwatchButton from "./StopWatchButton";
import "./styles/App.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const startStopwatch = () => setIsRunning(true);
  const stopStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    setTime(0);
    setLaps([]);
  };
  const recordLap = () => setLaps([...laps, time]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => Math.round((prevTime + 0.01) * 100) / 100); // Update time every hundredth of a second
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="app">
      <h1 className="app-title">Stopwatch App</h1>
      <Stopwatch time={time} />
      <div className="button-container">
        <StopwatchButton onClick={startStopwatch} label="Start" />
        <StopwatchButton onClick={stopStopwatch} label="Stop" />
        <StopwatchButton onClick={resetStopwatch} label="Reset" />
        <StopwatchButton onClick={recordLap} label="Lap" />
      </div>
      <div className="lap-container">
        {laps.map((lap, index) => (
          <p key={index} className="lap-time">
            Lap {index + 1}: {lap}s
          </p>
        ))}
      </div>
    </div>
  );
}
