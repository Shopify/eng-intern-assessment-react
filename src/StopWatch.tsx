import React, { useEffect, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import { act } from "@testing-library/react";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [lap, setLap] = useState<number[]>([]);

  /**
   * To not rely on processing times of setIntervals, we will use an accumulator.
   *
   * startDate will be set to the current date every time Start and Resume is clicked.
   * stackedTime is the accumulated time. Only non-zero when Pause is clicked.
   */
  const [startDate, setStartDate] = useState<number>(0);
  const [stackedTime, setStackedTime] = useState<number>(0);

  useEffect(() => {
    let interval: number | NodeJS.Timeout;

    if (running) {
      interval = setInterval(() => {
        act(() => {
          // accumulated value + (now - date since start/last resume)
          setTime(stackedTime + (Date.now() - startDate));
        });
      }, 20);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  /**
   * Button functionalities
   */
  const start = () => {
    setTime(0);
    setStartDate(Date.now());
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
    // adds the current time passed to the stacked time.
    setStackedTime(time);
  };

  const resume = () => {
    // renews new start time
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

  /**
   * Toggle functions changes button functions depending on the current
   * state of stopwatch.
   */
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
    <div className="stopwatch">
      <div className="timeDisplay">{displayTime(time)}</div>
      <br />
      <div className="buttonMap">
        <StopWatchButton {...toggleLapReset()} />
        <StopWatchButton {...toggleStartPause()} />
      </div>
      <hr hidden={lap.length == 0} />
      <div className="lapDisplay">
        <ul data-testid="lap-list">
          {lap
            .map((lapTime, index) => (
              <div key={index} className="lapList">
                <span>Lap {index + 1}</span>
                <span className="lapTime">{displayTime(lapTime)}</span>
              </div>
            ))
            .reverse()}
        </ul>
      </div>
    </div>
  );
}

/**
 * Returns time in correct format.
 *
 * @param {number} millisecond - The time passed in the Stopwatch in milliseconds.
 * @returns {String} The correct time in MM:SS:ss.
 */
function displayTime(millisecond: number) {
  const ms = Math.floor(millisecond / 10) % 100;
  const secs = Math.floor((millisecond / 1000) % 60);
  const mins = Math.floor(millisecond / 1000 / 60);

  // returns everything in 2 digits. Ex: aa:bb:cc
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}:${String(ms).padStart(2, "0")}`;
}
