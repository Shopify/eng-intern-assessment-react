import React, { useEffect, useContext } from "react";
import StopWatchButton from "./StopWatchButton";
import LapTable from "./LapTable";
// Context
import RunningContext from "./Context/RunningContext";
import TimeContext from "./Context/TimeContext";
// Styles
import "./Styles/StopWatch.css";

export default function StopWatch() {
  const { time, setTime } = useContext(TimeContext);
  const { running } = useContext(RunningContext);

  // While stopwatch is running, increase time by 1 every second
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime((prev: number) => prev + 1);
        console.log(time);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [running]);

  return (
    <div className="timer">
      <div className="timerContainer">
        <h1>Stop Watch</h1>
        <h1>{formatTime(time)}</h1>
        <StopWatchButton />
      </div>
      <div className="lapContainer">
        <h1>Lap Times</h1>
        <h3>
          <span>Lap</span>
          <span>Time</span>
        </h3>
        <LapTable />
      </div>
    </div>
  );
}

// Format time from seconds to HH:MM:SS format
export const formatTime = (time: number) => {
  const date = new Date(null);
  date.setSeconds(time);
  return date.toISOString().slice(11, 19);
};
