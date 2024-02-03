import React, { useState, useRef, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // Define state variables using the useState hook
  const [startTime, setStartTime] = useState<number>(null); // Start time of the stopwatch
  const [elaspedTime, setElaspedTime] = useState<number>(null); // Elapsed time since starting the stopwatch
  const [isRunning, setIsRunning] = useState<boolean>(null); // Flag to indicate if the stopwatch is running or not
  const [lapHistory, setLapHistory] = useState<number[]>([]); // Array to store lap times
  const [lapTime, setLapTime] = useState<number>(null); // Last lap time recorded
  const intervalRef = useRef(null); // Reference to the interval used for updating the stopwatch

  // Calculate the elapsed time in seconds
  let secondsPassed: number = 0;

  // Function to format time in hours:minutes:seconds.milliseconds format
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((time % 1) * 1000).toString().padStart(3, '0');

    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    } else {
      return `${minutes}:${seconds}.${milliseconds}`;
    }
  };

  // Function to handle starting the stopwatch
  const handleStart = () => {
    if (!isRunning) {
      const currentTime = Date.now();
      // Set start time and elapsed time
      setStartTime(currentTime - elaspedTime);
      setElaspedTime(currentTime);
      setLapHistory([...lapHistory]);
      setLapTime(currentTime);
      // Start the interval for updating the elapsed time
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setElaspedTime(Date.now() - startTime);
      }, 50);
      setIsRunning(true); // Set running flag to true
    }
  };

  // Function to handle stopping the stopwatch
  const handleStop = () => {
    clearInterval(intervalRef.current); // Clear the interval
    setIsRunning(false); // Set running flag to false
  };

  // Calculate the elapsed time in seconds if both start and elapsed times are set
  if (startTime != null && elaspedTime != null) {
    secondsPassed = (elaspedTime - startTime) / 1000;
  }

  // Function to handle recording a lap time
  const handleLap = () => {
    if (isRunning) {
      const lapElapsedTime: number = Date.now() - lapTime;
      setLapHistory([...lapHistory, lapElapsedTime]); // Add lap time to lap history
      setLapTime(Date.now()); // Set the current time as the last lap time
    }
  };

  // Function to handle resetting the stopwatch
  const handleReset = () => {
    clearInterval(intervalRef.current); // Clear the interval
    setElaspedTime(0); // Reset elapsed time
    setStartTime(null); // Reset start time
    setIsRunning(false); // Set running flag to false
    setLapHistory([]); // Clear lap history
    setLapTime(null); // Reset last lap time
  };

  // Render the stopwatch component
  return (
    <div className="container">
      <h1 className="Title">Stopwatch</h1>
      <div className="stopwatch-display">{formatTime(secondsPassed)}</div>
      <StopWatchButton
        onStart={handleStart}
        onStop={handleStop}
        onLap={handleLap}
        onReset={handleReset}
      />
      <ol className="lap-list">
        <h3>Lap Time</h3>
        {lapHistory.map((lapTime, index) => (
          <li className="lap-item" key={index}>{formatTime((lapTime/1000))}</li>
        ))}
      </ol>
    </div>
  );
}
