import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import "../src/styles/styles.css";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number>(0);
  const [lapTimeArray, setLapTimeArray] = useState<number[]>([]);

  useEffect(() => {
    let interval: number | NodeJS.Timeout = null;
    // Check if timer is running
    if (timerRunning) {
      // Interval updates every 10ms
      interval = setInterval(() => {
        // Increment the time state every 10ms
        setTime((time) => time + 10);
      }, 10);
    }
    // If timer is not running and time is not at 0
    else if (!timerRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // this useEffect will run when the timerRunning state changes
  }, [timerRunning]);

  function handleStartOrPause() {
    if (!timerRunning) {
      setTimerRunning(true);
    } else if (timerRunning) setTimerRunning(false);
  }
  function handleLap() {}

  return (
    <div id="stopwatch">
      <StopWatch time={time} />
      <div id="button-group">
        <StopWatchButton
          onClick={() => handleStartOrPause()}
          title={timerRunning ? "Pause" : "Start"}
        />
        <StopWatchButton onClick={() => handleLap()} title={"Lap"} />
      </div>
    </div>
  );
}
