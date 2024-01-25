import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import LapList from "./LapList";

export default function StopWatch() {
  // States storing time, if stopwatch is running, and an array of laps
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      // Every 10 milliseconds, increment the time by 1 centisecond
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          return prevTime + 1;
        });
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  // Start or stop the stopwatch
  const onStartStopClick = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  // Reset time to 0 and laps to initial state
  const onResetClick = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  // Add current time to list of laps
  const onLapsClick = () => {
    if (laps.length === 0) {
      setLaps([time]);
    } else {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  // Calculate hours
  const hours = Math.floor(time / 36000);
  // Calculate minutes
  const minutes = Math.floor((time % 360000) / 6000);
  // Calculate seconds
  const seconds = Math.floor((time % 6000) / 100);
  // Calculate milliseconds
  const milliseconds = time % 100;

  return (
    <div className="container">
      <div className="digits">
        <div>{hours}h</div>
        <div>{minutes}m</div>
        <div>{seconds}s</div>
        <div>{milliseconds}</div>
      </div>
      <StopWatchButton
        text={isRunning ? "Stop" : "Start"}
        onClick={onStartStopClick}
      />
      <StopWatchButton text="Reset" onClick={onResetClick} />
      <StopWatchButton text="Laps" onClick={onLapsClick} />
      <LapList laps={laps} />
    </div>
  );
}
