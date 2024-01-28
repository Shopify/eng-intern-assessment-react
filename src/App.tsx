/**
 * App.tsx
 *
 * This is the main component of the application. It's a stopwatch with start, stop, reset, and lap functionality.
 *
 * @imports
 * - Stopwatch: A component that displays the current time on the stopwatch.
 * - StopwatchButton: A component that represents a button on the stopwatch.
 * - App.css: The CSS styles for the App component.
 *
 * @state
 * - time: The current time on the stopwatch. It's updated every hundredth of a second when the stopwatch is running.
 * - isRunning: A boolean indicating whether the stopwatch is currently running.
 * - laps: An array of times at which the 'record lap' button was pressed.
 *
 * @functions
 * - startStopwatch: Starts the stopwatch by setting isRunning to true.
 * - stopStopwatch: Stops the stopwatch by setting isRunning to false.
 * - resetStopwatch: Resets the stopwatch by setting time to 0 and clearing the laps array.
 * - recordLap: Records the current time into the laps array.
 *
 * @useEffect
 * - Starts and stops the stopwatch. When isRunning is true, it starts an interval that updates the time every hundredth of a second. When isRunning becomes false, the interval is cleared.
 */
import React, { useState, useEffect } from "react";
import Stopwatch from "./components/StopWatch";
import StopwatchButton from "./components/StopWatchButton";
import "./styles/App.css";

export default function App() {
  // State variables
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Stopwatch control functions
  const startStopwatch = () => setIsRunning(true);
  const stopStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    setTime(0);
    setLaps([]);
  };
  const recordLap = () => setLaps([...laps, time]);

  // Update the time every hundredth of a second when the stopwatch is running
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => Math.round((prevTime + 0.01) * 100) / 100);
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
