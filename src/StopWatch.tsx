import React, { useState, useEffect } from "react";

import StopwatchButton from "./StopWatchButton";
import ScrollingBackground from "./ScrollingBackground";
import SonicSprite from "./SonicSprite";
import GameScene from "./GameScene";

type LapRecord = {
  time: number;
  distance: number;
};

export default function Stopwatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentLap, setCurrentLap] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [workout, setWorkout] = useState<number>(1);
  const [laps, setLaps] = useState<LapRecord[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
        setCurrentLap((prevLap) => prevLap + 10);
        setDistance(
          (prevDistance) => prevDistance + calculateDistanceIncrement(workout)
        );
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, workout]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setCurrentLap(0);
    setDistance(0);
  };

  const recordLap = () => {
    setLaps([...laps, { time: currentLap, distance }]);
    setCurrentLap(0);
    setDistance(0);
  };

  const increaseWorkout = () => {
    setWorkout((prevWorkout) => prevWorkout + 1);
  };

  const calculateDistanceIncrement = (workoutStat: number) => {
    return workoutStat / 100; // Increment per 10ms for workoutStat meters per second.
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = (time % 1000).toString().padStart(3, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(2)} meters`; // toFixed(2) to show two decimal places
  };

  return (
    <div>
      <div>
        <h3>Record Board:</h3>
        {laps
          .slice()
          .reverse()
          .map((lap, index) => (
            <div key={index}>
              Lap {laps.length - index}: {formatTime(lap.time)},{" "}
              {formatDistance(lap.distance)}
            </div>
          ))}
      </div>

      <StopwatchButton action={start} label="Start" />
      <StopwatchButton action={stop} label="Stop" />
      <StopwatchButton action={reset} label="Reset" />
      <StopwatchButton action={recordLap} label="Lap" />
      <StopwatchButton action={increaseWorkout} label="Increase Workout" />

      <GameScene isRunning={isRunning} workout={workout} />

      <div>{formatTime(time)}</div>
      <div>Current Distance: {formatDistance(distance)}</div>
      <div>Current Lap: {formatTime(currentLap)}</div>
      <div>Current Workout Level: {workout}</div>
    </div>
  );
}
