import React, { useEffect } from "react";
import "./StopWatch.css";
import StopWatchButton from "./StopWatchButton";
import { useStopWatch } from "./StopWatchContext";
import NESBackground from "./NESBackground";

const StopWatch: React.FC = () => {
  const {
    time,
    setTime,
    distance,
    setDistance,
    currentLap,
    setCurrentLap,
    workout,
    setWorkout,
    isRunning,
    setIsRunning,
    addLap,
  } = useStopWatch();

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
  }, [isRunning, workout, setTime, setCurrentLap, setDistance]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setCurrentLap(0);
    setDistance(0);
    setWorkout(1);
  };

  const recordLap = () => {
    if (time > 0 && currentLap > 0 && distance > 0) {
      addLap({ time: currentLap, distance });
      setCurrentLap(0);
      setDistance(0);
    }
  };

  const increaseWorkout = () => {
    setWorkout((prevWorkout) => prevWorkout + 1);
  };

  const calculateDistanceIncrement = (workoutStat: number) => {
    return workoutStat / 100; // Increment per 10ms for workoutStat meters per second.
  };

  return (
    <>
      <NESBackground size="medium">
        <h2>« Controls »</h2>
        <div className="stopwatch-controls">
          <StopWatchButton action={start} label="Start" />
          <StopWatchButton action={stop} label="Stop" />
          <StopWatchButton action={reset} label="Reset" />
          <StopWatchButton action={recordLap} label="Lap" />
          <StopWatchButton action={increaseWorkout} label="+1 Workout" />
        </div>
      </NESBackground>
    </>
  );
};

export default StopWatch;
