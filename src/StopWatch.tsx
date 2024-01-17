import React, { useEffect, useContext } from "react";
import StopWatchButton from "./StopWatchButton";
import LapTable from "./LapTable";
// Context
import RunningContext from "./Context/RunningContext";
import TimeContext from "./Context/TimeContext";
// Styles
import "./Styles/StopWatch.css";
// @ts-ignore
import carImage from "./images/car.png";
// @ts-ignore
import roadImage from "./images/road.jpeg";

export default function StopWatch() {
  const { time, setTime } = useContext(TimeContext);
  const { running } = useContext(RunningContext);

  // While stopwatch is running, increase time by 1 every second
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime((prev: number) => prev + 10);
        console.log(time);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [running]);

  return (
    <div className="timer">
      <div className="timerContainer">
        <h2>Stop Watch</h2>
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
      <div className="carMovement">
        <img src={carImage} alt="img" className={running ? "carMove" : "car"} />
      </div>
      <div className="roadContainer">
        <img src={roadImage} alt="img" className="road" />
      </div>
    </div>
  );
}

// Format time from seconds to HH:MM:SS format
export const formatTime = (time: number) => {
  const date = new Date(null);
  date.setMilliseconds(time);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = date
    .getUTCMilliseconds()
    .toString()
    .padStart(3, "0")
    .slice(0, 2);

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
