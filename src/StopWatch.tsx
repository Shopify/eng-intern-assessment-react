import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [laps, setLaps] = useState<number>(0);
  const [lapTimeArray, setLapTimeArray] = useState<number[]>([]);

  useEffect(() => {
    let interval = null;
    // Check if timer is running
    if (timerRunning) {
      // Interval updates every 10ms
      interval = setInterval(() => {
        // Increment the time state every 10ms
        setTime((prev) => prev + 10);
      }, 10);
    }
    // If timer is not running and time is not at 0
    else if (!timerRunning && time !== 0) {
      clearInterval(interval);
    }
    return clearInterval(interval);
    // this useEffect will run when the timerRunning state changes
  }, [timerRunning]);
  // converts number to a string and pads with '0' if single digit number
  function padNumbers(num: number) {
    return num.toString().padStart(2, "0");
  }
  // convert each value to correct value, format and pads number
  function formatNumbers(time: number) {
    const unFormattedHours = Math.floor((time / 3600000) % 24);
    const unFormattedMinutes = Math.floor((time / 60000) % 60);
    const unFormattedSeconds = Math.floor((time / 1000) % 60);
    const unFormattedMilliseconds = Math.floor((time / 10) % 100);
    const hours = padNumbers(unFormattedHours);
    const minutes = padNumbers(unFormattedMinutes);
    const seconds = padNumbers(unFormattedSeconds);
    const milliseconds = padNumbers(unFormattedMilliseconds);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return <div id="stopwatch">{formatNumbers(time)}</div>;
}
