import React, { useState, useEffect } from "react";

import "./styles.css";

import StopWatchButton from "./StopWatchButton";

import { getTimeBreakdown } from "../utils";
import LapList, { LapViews } from "./LapList";
import LapTime from "./LapTime";

const Stopwatch: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);
  const [lapView, setLapView] = useState<LapViews>("relative");

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
    setLapTimes([]);
  };

  const createNewLap = () => {
    let newLap: number = totalTime;
    setLapTimes((prevLaps) => [newLap, ...prevLaps]);
  };

  const toggleLapView = () => {
    setLapView(lapView === "relative" ? "absolute" : "relative");
  };

  const timeBreakdown = getTimeBreakdown(totalTime);

  const currentLapTime =
    lapTimes.length === 0 ? totalTime : totalTime - lapTimes[0];

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-6xl font-bold underline py-10">Stopwatch</h1>
      <div className="flex justify-center text-9xl py-5 -space-x-3">
        <div className="min-w-48">{`${timeBreakdown.minutes}`}</div>
        <div>:</div>
        <div className="min-w-48">{`${timeBreakdown.seconds}`}</div>
        <div>.</div>
        <div className="min-w-48">{`${timeBreakdown.milliseconds.slice(
          0,
          2
        )}`}</div>
      </div>

      <div className="flex justify-around w-full max-w-2xl">
        {isRunning ? (
          <>
            <StopWatchButton
              action="Pause"
              onClick={() => setIsRunning(!isRunning)}
              className="bg-red-300"
            />
            <StopWatchButton action="Lap" onClick={createNewLap} />
          </>
        ) : (
          <>
            <StopWatchButton
              action="Start"
              onClick={() => setIsRunning(!isRunning)}
              className="bg-green-300"
            />
            <StopWatchButton action="Reset" onClick={handleReset} />
          </>
        )}
        <StopWatchButton
          onClick={toggleLapView}
          action={lapView === "relative" ? "Absolute" : "Relative"}
        />
      </div>
      <div className="w-full max-w-2xl">
        {lapView === "relative" && <LapTime lapTime={currentLapTime} />}
        <LapList lapTimes={lapTimes} viewType={lapView} />
      </div>
    </div>
  );
};

export default Stopwatch;
