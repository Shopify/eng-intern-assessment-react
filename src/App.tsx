import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./utils/format-time";
import "./App.css";

export default function App() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  function onStartPauseClick() {
    setRunning((prevRunning) => !prevRunning);
  }

  function onResetClick() {
    setTime(0);
    setRunning(false);
    setLapTimes([]);
  }

  function onRecordLapClick() {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  }

  return (
    <div className="stopwatch-container">
      <StopWatch time={time} />
      <div className="button-container">
        <StopWatchButton
          name="Reset"
          running={running}
          handleClick={onResetClick}
        />
        <StopWatchButton
          name={running ? "Stop" : "Start"}
          running={running}
          handleClick={onStartPauseClick}
        />
        <StopWatchButton
          name="Record Lap"
          running={running}
          handleClick={onRecordLapClick}
        />
      </div>
      <div className="lap-time-container">
        {lapTimes.map((lapTime, index) => (
          <div key={index}>
            <p className="lap">
              Lap {index + 1}: {formatTime(lapTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
