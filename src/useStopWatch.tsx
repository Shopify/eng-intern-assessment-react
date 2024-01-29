import { useState, useEffect } from "react";

export const useStopWatch = () => {
  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem("isRunning");
    return savedIsRunning === "true";
  });
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem("startTime");
    return savedStartTime ? parseInt(savedStartTime, 10) : null;
  });
  const [elapsedTime, setElapsedTime] = useState(() => {
    const savedElapsedTime = localStorage.getItem("elapsedTime");
    return savedElapsedTime ? parseInt(savedElapsedTime, 10) : 0;
  });
  const [laps, setLaps] = useState(() => {
    const savedLaps = localStorage.getItem("laps");
    return savedLaps ? JSON.parse(savedLaps) : [];
  });
  const [lastLapTime, setLastLapTime] = useState(() => {
    const savedLastLapTime = localStorage.getItem("lastLapTime");
    return savedLastLapTime ? parseInt(savedLastLapTime, 10) : 0;
  });
  const hasStarted = isRunning || startTime;

  useEffect(() => {
    let intervalId: any;

    if (isRunning && startTime) {
      intervalId = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime);
      }, 10);
    }
    localStorage.setItem("isRunning", isRunning.toString());

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  useEffect(() => {
    localStorage.setItem("elapsedTime", elapsedTime.toString());
  }, [elapsedTime]);

  useEffect(() => {
    localStorage.setItem("laps", JSON.stringify(laps));
    localStorage.setItem("lastLapTime", lastLapTime.toString());
  }, [laps, lastLapTime]);

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
    setLastLapTime(0);
    localStorage.removeItem("laps");
    localStorage.removeItem("startTime");
    localStorage.removeItem("lastLapTime");
  };

  const addLap = () => {
    setLaps((prevLaps: number[]) => [...prevLaps, elapsedTime]);
    setLastLapTime(elapsedTime);
  };

  const formatTime = (lapTime?: number) => {
    const time = lapTime ?? elapsedTime;
    const totalMilliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    // Divide by 10 to get the two most significant digits of the milliseconds
    const milliseconds = Math.floor(totalMilliseconds / 10);

    // Pad with zeroes for consistent formatting
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
