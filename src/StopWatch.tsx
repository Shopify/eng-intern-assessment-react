import React from "react";
import { useState } from "react";
import StopWatchButton from "./StopWatchButton";
import "./StopWatch.css";

// A function that takes a total time in seconds and formats it into the "HH:MM:SS" time format
const formatTime = (time: number) => {
  // Calculate the number of hours by dividing total seconds by 3600 (60 seconds/minute * 60 minutes/hour)
  const hours = Math.floor(time / 3600);
  // Calculate the number of minutes by taking the remaining seconds after subtracting the hours, and then dividing by 60
  const minutes = Math.floor((time % 3600) / 60);
  // Calculate the remaining seconds by taking the modulus of total seconds divided by 60
  const remainingSeconds = time % 60;
  // Combine hours, minutes, and remaining seconds into a formatted time string ("HH:MM:SS")
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  return formattedTime;
};

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [laps, setLaps] = useState<{ id: number; time: number }[]>([]);
  const [lapIdCounter, setLapIdCounter] = useState<number>(0);

  // Start the timer if it's not running and set up an interval to increment elapsed time.
  const handleStart = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  // Stop the running timer by clearing the interval and updating state.
  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Reset the elapsed time to 0 and stop the running timer if any.
  const handleReset = () => {
    setElapsedTime(0);
    setLaps([]);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };
  // Add a new lap with current elapsed time to the laps array and update the lap ID counter.
  const handleLaps = () => {
    setLaps((prevLaps) => [
      ...prevLaps,
      { id: lapIdCounter, time: elapsedTime },
    ]);
    setLapIdCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <section className="stopwatch-container">
      <div className="stopwatch-display">
        {<div className="stopwatch-time">{formatTime(elapsedTime)}</div>}
        <div className="stopwatch-buttons">
          <StopWatchButton label="Start" onClick={handleStart} />
          <StopWatchButton label="Stop" onClick={handleStop} />
          <StopWatchButton label="Reset" onClick={handleReset} />
          <StopWatchButton label="Laps" onClick={handleLaps} />
        </div>
      </div>

      <div className="laps-container">
        <h3 className="laps-title">Laps</h3>
        <ul className="laps-list">
          {laps.map((lap) => (
            <li className="laps-item" key={lap.id}>
              {formatTime(lap.time)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
