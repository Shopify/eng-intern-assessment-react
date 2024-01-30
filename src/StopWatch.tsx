import React, { useState, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";

export function formatTime(time: number): string {
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
}

export default function StopWatch() {
  // state for time
  const [time, setTime] = useState(0);
  // state to check if stopwatch is running
  const [isRunning, setIsRunning] = useState(false);
  // state to check for laps
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  // time caclulation for hours, minutes, seconds, and milliseconds
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  // start and stop time
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // reset timer to 0
  const reset = () => {
    if (isRunning) {
      setTime(0);
      setIsRunning(!isRunning);
      setLaps([]);
    } else {
      setTime(0);
      setIsRunning(isRunning);
      setLaps([]);
    }
  };

  // record lap time
  const recordLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-cover bg-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Shopify_Logo.png/640px-Shopify_Logo.png"
        style={{
          width: "20%",
          height: "30%",
          padding: "30px",
          marginTop: "30px",
        }}
        alt="Shopify"
      />{" "}
      <h1 className="text-center text-3xl font-bold text-gray-800 mt-8">
        Shopify Stopwatch
      </h1>
      <div className="text-4xl font-semibold text-gray-700 mt-8">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </div>
      {/* pass props to StopWatchButton */}
      <div className=" space-x-4 mt-4">
        <StopWatchButton
          start={"Start"}
          stop={"Stop"}
          reset={"Reset"}
          lap={"Lap"}
          isRunning={isRunning}
          onStartStop={startAndStop}
          onReset={reset}
          onLap={recordLap}
        />
      </div>
      <div>
        {/* display laps */}
        {laps.length > 0 && (
          <div className="mt-8 max-h-64 overflow-auto">
            {" "}
            <p className="text-xl font-medium">Laps:</p>
            <ul className="list-decimal list-inside">
              {laps.map((lapTime, index) => (
                <li key={index} className="text-gray-600">
                  Lap {index + 1}: {formatTime(lapTime)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
