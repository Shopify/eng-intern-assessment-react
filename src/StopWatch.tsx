import React, { useEffect, useState, createContext, useContext } from "react";
import StopWatchButton from "./StopWatchButton";
import { useStopWatchContext } from "./StopWatchContext";

// Component that returns the entire stop watch
export default function StopWatch() {
  const { isRunning, time, setTime, laps } = useStopWatchContext();

  // useEffect that handles the incrementation of the time state variable
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isRunning) {
      // increment the time by 1 every 10 milliseconds
      interval = setInterval(() => setTime(time + 1), 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  // function that formats the time to be displayed in hours:minutes:... format
  const formatTime = (time: number) => {
    // function that adds a leading 0 if the number is less than 10
    const addLeadingZero = (num: number) => (num < 10 ? `0${num}` : num);

    const hours = addLeadingZero(Math.floor(time / 360000));
    const minutes = addLeadingZero(Math.floor((time % 360000) / 6000));
    const seconds = addLeadingZero(Math.floor((time % 6000) / 100));
    const milliseconds = addLeadingZero(time % 100);

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="current-time">{formatTime(time)}</div>
      <StopWatchButton />
      {laps.length > 0 && (
        <table className="lap-table">
          <tr>
            <th>Lap #</th>
            <th>Time</th>
          </tr>
          {laps.map((lap, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{formatTime(lap)}</td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
