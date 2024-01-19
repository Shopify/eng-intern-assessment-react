import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "../src/styles/styles.css";

export default function App() {
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  useEffect(() => {
    let interval: number | NodeJS.Timeout = null;
    // Check if timer is running
    if (timerRunning) {
      // Interval updates every 10ms
      interval = setInterval(() => {
        // Increment the time state every 10ms
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    // If timer is not running and time is not at 0
    else if (!timerRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // this useEffect will run when the timerRunning state changes
  }, [timerRunning]);

  function handleStartOrPauseButton() {
    if (!timerRunning) {
      setTimerRunning(true);
    } else if (timerRunning) setTimerRunning(false);
  }

  function calculateSplitTime(numbers: number[]): number {
    return numbers.reduce((sum, currentNumber) => sum + currentNumber, 0);
  }
  // Handle lap time button clicks
  function handleLapButton() {
    if (timerRunning) {
      //  Increment lap state by 1
      setLaps((prevLaps) => {
        const updatedLaps = prevLaps + 1;

        /**
         * Calculate split time for the last lap
         * If there are any laps already then use this to calculate the split time
         * between laps. For the first lap, set the split time as the current time
         */

        const splitTime =
          updatedLaps > 1 ? time - calculateSplitTime(lapTimes) : time;

        // Add new times to the lapTimes Arrays
        setLapTimes((prevLapTimes) => [...prevLapTimes, splitTime]);

        return updatedLaps;
      });
    }
  }
  // Reset button resets laps, sets timer to 0, and stops the timer
  function handleResetButton() {
    setTimerRunning(false);
    setLapTimes([]);
    setLaps(0);
    setTime(0);
  }

  return (
    <div id="stopwatch">
      <h1 id="title">Stop Watch</h1>
      <StopWatch time={time} lapTimes={lapTimes} laps={laps} />
      <div id="button-group">
        <StopWatchButton
          onClick={() => handleStartOrPauseButton()}
          title={timerRunning ? "Pause" : "Start"}
          className={"enabled-button"}
        />
        <StopWatchButton
          onClick={() => handleResetButton()}
          title={"Reset"}
          className={"enabled-button"}
        />
        <StopWatchButton
          onClick={() => handleLapButton()}
          title={"Lap"}
          className={timerRunning ? "enabled-button" : "disabled-button"}
        />
      </div>
    </div>
  );
}
