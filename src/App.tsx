import React, { useEffect, useRef, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./App.css";

interface listType {
  id: number;
  time: number;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const remainingSeconds = Math.floor(time % 60);

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapList, setLapList] = useState<listType[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);

  const toggleStopWatch = () => {
    if (!isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      window.clearInterval(intervalRef.current);
    }
    setIsRunning(!isRunning);
  };

  const resetStopWatch = () => {
    setIsRunning(false);
    setTime(0);
    window.clearInterval(intervalRef.current);
  };

  const lapStopWatch = () => {
    const newLap = {
      id: lapList.length + 1,
      time: time,
    };
    setLapList((prevLapList) => [...prevLapList, newLap]);
  };

  return (
    <div>
      <h1>StopWatch</h1>
      <StopWatch time={formatTime(time)} />
      <div className="btn-container">
        <StopWatchButton
          handleClick={toggleStopWatch}
          label={isRunning ? "Stop" : "Start"}
        />
        <StopWatchButton handleClick={resetStopWatch} label="Reset" />
        <StopWatchButton handleClick={lapStopWatch} label="Lap" />
      </div>
      {lapList.map((lap) => (
        <p>
          {lap.id}. {lap.time}
        </p>
      ))}
    </div>
  );
}
