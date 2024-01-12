import React, { useRef, useState } from "react";
import StopWatchButton from "./StopWatchButton";
import formatTime from "./helpers/formatTime";

interface lapListType {
  id: number;
  time: string;
}

export default function StopWatch() {
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
    <>
      <h1>{formatTime(time)}</h1>
      <div className="btn-container">
        <StopWatchButton
          name={isRunning ? "stop" : "start"}
          clickable={true}
          handleClick={toggleStopWatch}
          label={isRunning ? "Stop" : "Start"}
        />
        <StopWatchButton
          name="reset"
          clickable={true}
          handleClick={resetStopWatch}
          label="Reset"
        />
        <StopWatchButton
          name="lap"
          clickable={isRunning}
          handleClick={lapStopWatch}
          label="Lap"
        />
      </div>
      {lapList.map((lap) => (
        <p key={lap.id}>
          <strong>Lap {lap.id}:</strong> {lap.time}
        </p>
      ))}
    </>
  );
}
