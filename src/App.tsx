import React, { useEffect, useRef, useState } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./App.css";

interface lapListType {
  id: number;
  time: string;
}

const formatTime = (time: number) => {
  // Convert milliseconds to centiseconds
  const centiseconds = Math.floor(time / 10);

  // Calculate minutes, seconds, and remaining centiseconds
  const minutes = Math.floor(centiseconds / 6000);
  const seconds = Math.floor((centiseconds % 6000) / 100);
  const remainingCentiseconds = centiseconds % 100;

  // Format each component with leading zeros if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedCentiseconds = remainingCentiseconds
    .toString()
    .padStart(2, "0");

  // Construct the formatted time string
  return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
};

export default function App() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapList, setLapList] = useState<lapListType[]>([]);
  const intervalRef = useRef<number | undefined>(undefined);

  const toggleStopWatch = () => {
    if (!isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      window.clearInterval(intervalRef.current);
    }
    setIsRunning(!isRunning);
  };

  const resetStopWatch = () => {
    setIsRunning(false);
    setTime(0);
    window.clearInterval(intervalRef.current);
    setLapList([]);
  };

  const lapStopWatch = () => {
    const newLap = {
      id: lapList.length + 1,
      time: formatTime(time),
    };
    setLapList((prevLapList) => [...prevLapList, newLap]);
  };

  return (
    <div>
      <StopWatch time={formatTime(time)} />
      <div className="btn-container">
        <StopWatchButton
          clickable={true}
          handleClick={toggleStopWatch}
          label={isRunning ? "Stop" : "Start"}
        />
        <StopWatchButton
          clickable={true}
          handleClick={resetStopWatch}
          label="Reset"
        />
        <StopWatchButton
          clickable={isRunning}
          handleClick={lapStopWatch}
          label="Lap"
        />
      </div>
      {lapList.map((lap) => (
        <p key={lap.id}>
          {lap.id}. {lap.time}
        </p>
      ))}
    </div>
  );
}
