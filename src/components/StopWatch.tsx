import React, { useState, useRef } from "react";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "../utils/stopwatchUtils";
import LapTable from "./LapTable";
import type { Lap } from "./LapTable";

export default function StopWatch() {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [longestLap, setLongestLap] = useState<Lap | null>(null);
  const [shortestLap, setShortestLap] = useState<Lap | null>(null);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      // Starts the timer by setting an interval to increment the milliseconds state every 10 milliseconds
      intervalRef.current = setInterval(() => {
        setMilliseconds((prev) => prev + 10);
      }, 10);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      // Stops the timer by clearing the interval
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleLap = () => {
    const lap: Lap = {
      number: laps.length + 1,
      // Calculate the split time by subtracting the previous lap's total time from the current time
      split:
        milliseconds -
        (laps.length === 0 ? 0 : laps[laps.length - 1].totalTime),
      totalTime: milliseconds,
    };
    setLaps((prev) => [...prev, lap]);
    // Check for the longest lap
    if (!longestLap || lap.split > longestLap.split) {
      setLongestLap(lap);
    }
    // Check for the shortest lap
    if (!shortestLap || lap.split < shortestLap.split) {
      setShortestLap(lap);
    }
  };

  const handleReset = () => {
    setMilliseconds(0);
    setIsRunning(false);
    setLaps([]);
    setLongestLap(null);
    setShortestLap(null);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="stopwatch-container">
      <p className="timer">{formatTime(milliseconds)}</p>
      <StopWatchButton
        isRunning={isRunning}
        handleStart={handleStart}
        handleStop={handleStop}
        handleLap={handleLap}
        handleReset={handleReset}
      />
      <LapTable laps={laps} longestLap={longestLap} shortestLap={shortestLap} />
    </div>
  );
}
