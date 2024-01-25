import React, { useState, useEffect, useRef } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // State for tracking whether the stopwatch is running
  const [isRunning, setIsRunning] = useState(false);
  // State for tracking the elapsed time in milliseconds
  const [elapsedTime, setElapsedTime] = useState(0);
  // State for storing lap times
  const [laps, setLaps] = useState<number[]>([]);
  // Ref for the interval timer. Using useRef here to avoid re-rendering the component
  // every time the interval is cleared or set. useRef allows us to persist values
  // across renders without causing state updates.
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for handling the stopwatch timing
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Cleanup function to clear the timer when the component unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Function to toggle the running state of the stopwatch
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Function to reset the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Function to record a lap time
  const handleLap = () => {
    setLaps([...laps, elapsedTime]);
  };

  /**
   * Formats the elapsed time into a string of format "mm:ss.mmm".
   * @param {number} time - The time in milliseconds.
   * @return {string} The formatted time string.
   */
  // Convertor so after miliseconds reaches x point it becomes seconds and same with seconds to minutes.
  const formatTime = (time: number) => {
    const milliseconds = `00${time % 1000}`.slice(-3);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <div>{formatTime(elapsedTime)}</div>
      <StopWatchButton
        isRunning={isRunning}
        onStartStop={handleStartStop}
        onReset={handleReset}
        onLap={handleLap}
      />
      {laps.length > 0 && (
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{`${formatTime(lap)} Lap ${index + 1}`}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
