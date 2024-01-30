import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch";
import StopwatchButton from "./StopwatchButton";
import "./App.css";

const App: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [running, setRunning] = useState<boolean>(false);

  // Add useEffect hook
  useEffect(() => {
    // Create interval
    let interval: NodeJS.Timeout;
    // Start interval if running
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Add event handlers
  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };
  const handleLap = () => setLaps([...laps, time]);

  return (
    <div className="stopwatch-container">
      <span className="stopwatch-display">
        <Stopwatch time={time} />
      </span>
      <div className="buttons-container">
        <div className="stopwatch-button">
          <div className="start-button">
            <StopwatchButton
              onClick={handleStart}
              label="Start"
              disabled={running}
              className="stopwatch-button start-button"
            />
          </div>
          <div className="stop-button">
            <StopwatchButton
              onClick={handleStop}
              label="Stop"
              disabled={!running}
              className="stopwatch-button stop-button"
            />
          </div>
          <div className="reset-button">
            <StopwatchButton
              onClick={handleReset}
              label="Reset"
              disabled={!running && time === 0}
              className="stopwatch-button reset-button"
            />
          </div>

          <div className="lap-button">
            <StopwatchButton
              onClick={handleLap}
              label="Lap"
              disabled={!running}
              className="stopwatch-button lap-button"
            />
          </div>
        </div>
      </div>
      {laps.map((lap, index) => (
        <div className="laps" key={index}>
          Lap {index + 1}: {formatTime(lap)}
        </div>
      ))}
    </div>
  );
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
};

const pad = (num: number) => num.toString().padStart(2, "0");

export default App;
