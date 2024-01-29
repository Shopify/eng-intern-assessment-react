import { useState, useEffect } from "react";

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(() => {
    const savedIsRunning = localStorage.getItem("isRunning");
    return savedIsRunning === "true"; // Convert string to boolean
  });
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem("startTime");
    return savedStartTime ? parseInt(savedStartTime, 10) : null;
  });
  const [elapsedTime, setElapsedTime] = useState(() => {
    const savedElapsedTime = localStorage.getItem("elapsedTime");
    return savedElapsedTime ? parseInt(savedElapsedTime, 10) : 0;
  });

  useEffect(() => {
    let intervalId: any;

    if (isRunning && startTime) {
      intervalId = setInterval(() => {
        setElapsedTime(new Date().getTime() - startTime);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  useEffect(() => {
    localStorage.setItem("elapsedTime", elapsedTime.toString());
    localStorage.setItem("isRunning", isRunning.toString());
  }, [elapsedTime, isRunning]);

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
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);
    localStorage.removeItem("startTime");
  };

  const formattedTime = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");
    const paddedMilliseconds = String(milliseconds).padStart(2, "0");
    console.log(paddedMilliseconds);

    return `${paddedMinutes}:${paddedSeconds}:${paddedMilliseconds}`;
  };

  return { isRunning, start, pause, reset, formattedTime };
};
