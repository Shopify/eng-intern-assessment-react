import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import { act } from "@testing-library/react";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [lap, setLap] = useState<number[]>([]);

  // startDate and stackedTime to calculate precise time inputs
  // without relying on processing times of setIntervals.
  const [startDate, setStartDate] = useState<number>(0);
  const [stackedTime, setStackedTime] = useState<number>(0);

  useEffect(() => {
    let interval: number | NodeJS.Timeout;

    if (running) {
      interval = setInterval(() => {
        act(() => {
          setTime(stackedTime + (Date.now() - startDate));
        });
      }, 20);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  // button functionalities
  const start = () => {
    setTime(0);
    setStartDate(Date.now());
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
    setStackedTime(time);
  };

  const resume = () => {
    setStartDate(Date.now());
    setRunning(true);
  };

  const reset = () => {
    setTime(0);
    setRunning(false);
    setStackedTime(0);
    setStartDate(0);
    setLap([]);
  };

  const handleLaps = () => setLap((prevLaps) => [...prevLaps, time]);

  const toggleStartPause = () => {
    if (!running && time == 0)
      return { onClick: start, label: "Start", disabled: false };
    else if (!running && time != 0)
      return { onClick: resume, label: "Resume", disabled: false };
    else return { onClick: pause, label: "Pause", disabled: false };
  };

  const toggleLapReset = () => {
    if (!running && time == 0)
      return { onClick: handleLaps, label: "Lap", disabled: true };
    else if (!running && time != 0)
      return { onClick: reset, label: "Reset", disabled: false };
    else return { onClick: handleLaps, label: "Lap", disabled: false };
  };

  return (
    <div>
      <div>{displayTime(time)}</div>
      <br />
      <div>
        <StopWatchButton {...toggleLapReset()} />
        <StopWatchButton {...toggleStartPause()} />
      </div>
      <div hidden={lap.length == 0}>
        <ul data-testid="lap-list">
          {lap
            .map((lapTime, index) => (
              <div key={index}>
                <span>{displayTime(lapTime)}</span>
              </div>
            ))
            .reverse()}
        </ul>
      </div>
    </div>
  );
}

function displayTime(millisecond: number) {
  const ms = Math.floor(millisecond / 10) % 100;
  const secs = Math.floor((millisecond / 1000) % 60);
  const mins = Math.floor(millisecond / 1000 / 60);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}:${String(ms).padStart(2, "0")}`;
}
