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
    let interval: NodeJS.Timeout | null = null;

    const startInterval = () => {
      interval = setInterval(() => {
        setTotalTime((currTime) => currTime + 10);
      }, 10);
    };

    if (isRunning) {
      startInterval();
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

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
    <div className="text-center w-10/12 mx-auto">
      <h1 className="text-3xl font-bold underline my-5 py-10">Stopwatch</h1>
      <div className="flex justify-center">
        <table className="table-fixed">
          <tbody className="">
            <tr className="text-9xl">
              <td className="w-40">{`${formatTime(totalTime).minutes}:`}</td>
              <td className="w-40">{`${formatTime(totalTime).seconds}.`}</td>
              <td className="w-40">{`${
                formatTime(totalTime).centiseconds
              }`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <StopWatchButton
          action={isRunning ? "Pause" : "Start"}
          onClick={handleStartStop}
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
