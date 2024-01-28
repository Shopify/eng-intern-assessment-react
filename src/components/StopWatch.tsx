import React, { useEffect } from "react";
import { useStopWatch } from "./StopWatchContext";
import "./../css/StopWatch.css";

import StopWatchButton from "./StopWatchButton";
import NESBackground from "./NESBackground";
import KeyBindings from "./KeyBindings";

// accessing context hook to access stopwatch state and functions
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
    formatTime,
    formatDistance,
  } = useStopWatch();

  // update time, distance and current lap every 10ms while running
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

  // start, stop, reset and record lap functions
  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setCurrentLap(0);
    setDistance(0);
    setWorkout(1);
  };

  // record lap while time lap and distance are not 0 to prevent lap spamming
  const recordLap = () => {
    if (time > 0 && currentLap > 0 && distance > 0) {
      addLap({ time: currentLap, distance });
      setCurrentLap(0);
      setDistance(0);
    }
  };

  // increase workout level to make sonic go faster and speed up scrolling background
  const increaseWorkout = () => {
    setWorkout((prevWorkout) => prevWorkout + 1);
  };

  // helper function to calculate distance increment based on workout level
  const calculateDistanceIncrement = (workoutStat: number) => {
    return workoutStat / 100; // Increment per 10ms for workoutStat meters per second.
  };

  return (
    <div
      className="stopwatch-controls"
      role="complementary"
      aria-labelledby="stopwatch-controls"
    >
      {/* keybindings support for accessibility */}
      <KeyBindings
        isRunning={isRunning}
        toggleStartStop={isRunning ? stop : start}
        handleWorkout={increaseWorkout}
        handleLap={recordLap}
        handleReset={reset}
      />

      {/* stopwatch buttons rendered on game, with ARIA attributes including keybinds */}
      <NESBackground size="small">
        <h2>« Controls »</h2>
        <StopWatchButton
          aria-label="Press Spacebar to start running"
          action={start}
          label="Start (Space)"
        />
        <StopWatchButton
          aria-label="Press Spacebar to stop running"
          action={stop}
          label="Stop (Space)"
        />
        <StopWatchButton
          aria-label="Press R Key to reset stats and run"
          action={reset}
          label="Reset (R)"
        />
        <StopWatchButton
          aria-label="Press Enter to record lap stats"
          action={recordLap}
          label="Lap (Enter)"
        />
        <StopWatchButton
          aria-label="Press W Key to increase workout level to make Sonic go faster"
          action={increaseWorkout}
          label="Workout (W)"
        />
      </NESBackground>
    </div>
  );
};

export default StopWatch;
