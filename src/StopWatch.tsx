import React from "react";
import moment from 'moment';
import { useEffect } from "react";

export interface StopwatchProps {
  time: number;
  isPaused: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function StopWatch({
  time,
  isPaused,
  setTime,
}: StopwatchProps) {
  // Increase stop watch by 10 milliseconds each time
  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [isPaused]);

  // Used moment library to format the time.
  const formattedTime = time < 3600000 ? moment.utc(time).format("mm:ss.SS") : moment.utc(time).format("HH:mm:ss.SS");
  return <div className="timer">{formattedTime}</div>;
}
