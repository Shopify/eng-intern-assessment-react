import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

// Format time to show minutes, seconds, and milliseconds
function formatTime(ms: number): string {
  let milliseconds = (ms / 10) % 100;
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / 60000);

  // Pad with leading zeros to show two digits for minutes and seconds, and three digits for milliseconds
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(2, "0")}`;
}

// StopWatch Component
const StopWatch: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false); // Determine if the stopwatch is running
  const [isPaused, setIsPaused] = useState<boolean>(true); // Determine if the stopwatch is paused
  const [time, setTime] = useState<number>(0); // Elapsed time in milliseconds

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // If the stopwatch is running and not paused, increment the time by 10 milliseconds every 10 milliseconds
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);

      // If the stopwatch is not active or is paused, clear the interval
    } else if (interval) {
      clearInterval(interval);
    }

    // Cleanup function to clear the interval
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);

  // Handle the start and pause button
  const handleStartStop = () => {
    setIsActive((currentIsActive) => !currentIsActive);
    setIsPaused((currentIsPaused) => !currentIsPaused);
  };

  // Handle the reset button
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(0);
  };

  return (
    <div>
      <h1>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <StopWatchButton onClick={handleReset} label="Reset" />
      <StopWatchButton onClick={handleStartStop} label={isActive && !isPaused ? "Pause" : "Start"} />
    </div>
  );
};

export default StopWatch;
