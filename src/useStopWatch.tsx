import { useState, useEffect } from "react";

export const useStopWatch = () => {
  // all variables are synced in local storage so that the stopwatch is able to persist through different sessions
  // stores whether timer is running or paused
  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem("isRunning");
    return savedIsRunning === "true";
  });

  // stores the time at which the timer started
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem("startTime");
    return savedStartTime ? parseInt(savedStartTime, 10) : null;
  });

  // stores how long the timer has been running for
  const [elapsedTime, setElapsedTime] = useState(() => {
    const savedElapsedTime = localStorage.getItem("elapsedTime");
    return savedElapsedTime ? parseInt(savedElapsedTime, 10) : 0;
  });

  // stores the timestamp of each lap
  const [laps, setLaps] = useState(() => {
    const savedLaps = localStorage.getItem("laps");
    return savedLaps ? JSON.parse(savedLaps) : [];
  });

  const hasStarted = isRunning || startTime;

  useEffect(() => {
    let intervalId: any;

    if (isRunning && startTime) {
      // increments by 1ms
      intervalId = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime);
      }, 10);
    }
    localStorage.setItem("isRunning", isRunning.toString());

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  // sync with local storage
  useEffect(() => {
    localStorage.setItem("elapsedTime", elapsedTime.toString());
  }, [elapsedTime]);

  // sync with local storage
  useEffect(() => {
    localStorage.setItem("laps", JSON.stringify(laps));
  }, [laps]);

  const start = () => {
    const now = new Date().getTime();
    const newStartTime = elapsedTime ? now - elapsedTime : now;
    setStartTime(newStartTime);
    localStorage.setItem("startTime", newStartTime.toString());
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setStartTime(null);
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
    localStorage.removeItem("laps");
    localStorage.removeItem("startTime");
    localStorage.removeItem("lastLapTime");
  };

  const addLap = () => {
    setLaps((prevLaps: number[]) => [...prevLaps, elapsedTime]);
  };

  const formatTime = (lapTime?: number) => {
    const time = lapTime ?? elapsedTime;
    const totalMilliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    const milliseconds = Math.floor(totalMilliseconds / 10);

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    const paddedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
  };

  return {
    isRunning,
    start,
    laps,
    addLap,
    pause,
    reset,
    formatTime,
    hasStarted,
  };
};
