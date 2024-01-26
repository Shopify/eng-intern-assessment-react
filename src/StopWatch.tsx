import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import {
  faFlag,
  faPlay,
  faRedo,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // update every 10 milliseconds
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };
  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); // 2 digit milliseconds

    return {
      minutes: `${minutes < 10 ? "0" : ""}${minutes}`,
      seconds: `${seconds < 10 ? "0" : ""}${seconds}`,
      milliseconds: `${milliseconds < 10 ? "0" : ""}${milliseconds}`,
    };
  };

  const buttons = [
    {
      onClick: recordLap,
      disabled: !isRunning,
      icon: faFlag,
      label: "Record Lap",
    },
    {
      onClick: isRunning ? stop : start,
      icon: isRunning ? faStop : faPlay,
      label: isRunning ? "Stop" : "Start",
    },
    {
      onClick: reset,
      disabled: time === 0,
      icon: faRedo,
      label: "Reset",
    },
  ];

  return (
    <div>
      <h2>Stopwatch</h2>
      <div className="time-display">
        <span className="minutes">{formatTime(time).minutes}</span>:
        <span className="seconds">{formatTime(time).seconds}</span>:
        <span className="milliseconds">{formatTime(time).milliseconds}</span>
      </div>
      {buttons.map((button, index) => (
        <StopWatchButton key={index} {...button} />
      ))}
      {laps.length > 0 && (
        <div>
          <h3>Laps</h3>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{formatTime(lap)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
