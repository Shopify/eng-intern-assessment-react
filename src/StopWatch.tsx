import React, { useState, useEffect } from "react";

import "./styles.css";

import StopWatchButton from "./StopWatchButton";

import { formatTime } from "./utils";
import LapList from "./LapList";

type ViewType = "absolute" | "relative";

const Stopwatch: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [lapView, setLapView] = useState<ViewType>("relative");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTotalTime((currTime) => currTime + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handleReset = () => {
    setTotalTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const createNewLap = () => {
    let newLap: number = totalTime;
    setLaps((prevLaps) => [...prevLaps, newLap]);
  };

  const toggleLapView = () => {
    setLapView(lapView === "relative" ? "absolute" : "relative");
  };

  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold underline py-10">Stopwatch</h1>
      <div className="flex justify-center text-9xl py-5 -space-x-5">
        <div className="min-w-48">{`${formatTime(totalTime).minutes}`}</div>
        <div>:</div>
        <div className="min-w-48">{`${formatTime(totalTime).seconds}`}</div>
        <div>.</div>
        <div className=" min-w-48">{`${
          formatTime(totalTime).centiseconds
        }`}</div>
      </div>

      <div>
        <StopWatchButton
          action={isRunning ? "Pause" : "Start"}
          onClick={() => setIsRunning(!isRunning)}
        />
        {isRunning ? (
          <StopWatchButton action="Lap" onClick={createNewLap} />
        ) : (
          <StopWatchButton action="Reset" onClick={handleReset} />
        )}
      </div>
      <div>
        <button onClick={toggleLapView}>
          {lapView === "relative" ? "absolute" : "relative"}
        </button>
        <LapList lapList={laps} viewType={lapView} />
      </div>
    </div>
  );
};

export default Stopwatch;
