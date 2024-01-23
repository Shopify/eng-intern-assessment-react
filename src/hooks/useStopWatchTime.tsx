import React, { useState, useEffect } from "react";

/* Custom hook for managing time-related state variables */
export const useStopWatchTime = () => {
  const [time, setTime] = useState<number>(0);
  const [timeOn, setTimeOn] = useState<boolean>(false);

  useEffect(() => {
    // setInterval returns Timeout object as an ID for the interval
    let interval: NodeJS.Timeout | null = null;

    if (timeOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeOn]);

  return { time, setTime, timeOn, setTimeOn };
};
