import React, { useState, useEffect } from "react";
import StopWatch from "./components/StopWatch";
import StopWatchButton from "./components/StopWatchButton";
import "./styles.css";

export default function App() {
  // State variables to manage stopwatch state
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);

  // Effect to update the time every second when stopwatch is running
  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    // Cleanup function to clear the interval on component unmount or when isRunning is set to false

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  // Function to start the stopwatch
  const startStopWatch = () => {
    setIsRunning(true);
  };

  // Function to stop the stopwatch
  const stopStopWatch = () => {
    setIsRunning(false);
  };

  // Function to reset the stopwatch and clear laps
  const resetStopWatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const lapStopWatch = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <div className="main-stopwatch">
      <StopWatch timerSeconds={time} />
      <StopWatchButton
        onStart={startStopWatch}
        onStop={stopStopWatch}
        onReset={resetStopWatch}
        onLap={lapStopWatch}
      />
      <div className="laps-container">
        <h2>Laps Total:</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
// Function to format time as hour:min:sec
const formatTime = (time: number): string => {
  const pad = (num: number) => (num < 10 ? "0" + num : num);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
