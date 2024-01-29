import React from "react";
import { useState, useEffect } from "react";

function formatTime(time: number): string {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return `${hours}:${minutes.toString().padStart(2, "0")}:
                ${seconds.toString().padStart(2, "0")}:
                ${milliseconds.toString().padStart(2, "0")}`;
}

export default function StopWatch() {
  // state for time
  const [time, setTime] = useState(0);
  // state to check if stopwatch is running
  const [isRunning, setIsRunning] = useState(false);
  // state to check for laps
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  // time caclulation for hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // start and stop time
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // reset timer to 0
  const reset = () => {
    if (isRunning) {
      setTime(0);
      setIsRunning(!isRunning);
      setLaps([]);
    } else {
      setTime(0);
      setIsRunning(isRunning);
      setLaps([]);
    }
  };

  // record lap time
  const recordLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  return (
    <div>
      <div>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </div>
      <div>
        <button onClick={startAndStop}>{isRunning ? "Stop" : "Start"}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={recordLap}>Lap</button>
      </div>
      {laps.length > 0 && (
        <div>
          <p>Laps:</p>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lapTime)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
