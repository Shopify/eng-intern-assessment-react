import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

/**
 * Formats the time in HH:MM:SS format.
 * @param {number} time - The time in seconds.
 * @returns {string} - The formatted time string.
 */
const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // Ensure that each part has leading zeros if less than 10
  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val.toString()))
    .join(":");
};

const Stopwatch: React.FC = () => {
  // State variables to manage time, running state, paused state, and lap times
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Effect to update time when running and not paused
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (running && !paused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    // Cleanup interval on unmount or when conditions change
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running, paused]);

  // Function to handle Start, Stop, and Resume button click
  const handleStartStopResume = (): void => {
    if (!running) {
      // Start the stopwatch
      setRunning(true);
      setPaused(false);
    } else if (!paused) {
      // Pause the stopwatch
      setPaused(true);
    } else {
      // Resume the stopwatch
      setPaused(false);
    }
  };

  // Function to handle Lap button click
  const handleLap = (): void => {
    if (running && !paused) {
      // Record lap time
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  // Function to handle Reset button click
  const handleReset = (): void => {
    setRunning(false);
    setTime(0);
    setLaps([]);
    setPaused(false);
  };

  // Determine the button text based on the current state
  const buttonText = !running ? "Start" : paused ? "Resume" : "Stop";

  return (
    <div className="stopwatch">
      <div className="stopwatch__display">{formatTime(time)}</div>
      <br />
      <div className="stopwatch__controls">
        <StopWatchButton label={buttonText} onClick={handleStartStopResume} />
        <StopWatchButton
          label="Lap"
          onClick={handleLap}
          disabled={!running || paused}
        />
        <StopWatchButton
          label="Reset"
          onClick={handleReset}
          disabled={!running && time === 0}
        />
      </div>
      <div className="stopwatch__laps">
        <h2>Laps</h2>
        <ul data-testid="lap-list">
          {laps.map((lapTime, index) => (
            <li key={index}>{formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
