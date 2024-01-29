import React, { useState, useEffect } from "react";

import StopWatchButton from "./StopWatchButton";
import Lap from "./Lap";
import LapList from "./LapList";

import { getTimeBreakdown } from "../utils";

const Stopwatch: React.FC = () => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

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

  const timeBreakdown = getTimeBreakdown(totalTime);

  const currentLapTime =
    lapTimes.length === 0 ? totalTime : totalTime - lapTimes[0];

  return (
    <div
      className="flex flex-col items-center text-center justify-center h-screen bg-red-200"
      data-testid="stopwatch"
    >
      <div className="flex justify-center text-9xl pb-7 -space-x-3">
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
      </div>
      <div className="flex flex-col w-full max-w-2xl my-9">
        <div className="flex justify-between gap-4 text-3xl">
          <div className="min-w-36 ">Laps</div>
          <div className="min-w-36 ">Relative Time</div>
          <div className="min-w-36 ">Absolute Time</div>
        </div>
        <Lap relativeLapTime={currentLapTime} totalLapTime={totalTime} />
        <LapList lapTimes={lapTimes} />
      </div>
    </div>
  );
};

export default Stopwatch;
