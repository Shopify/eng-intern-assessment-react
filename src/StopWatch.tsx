import React from "react";
import { format } from "date-fns";
import { useEffect } from "react";

interface StopwatchProps {
  time: number;
  isPaused: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StopWatch({
  time,
  isPaused,
  setTime,
  setIsPaused,
}: StopwatchProps) {

  useEffect(() => {
    if (!isPaused) {
      const intervalId = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [isPaused]);

  const formattedTime = time < 3600000 ? format(new Date(time), "mm:ss.SS") : format(new Date(time), "hh:mm:ss.SS");

  return (
    <div
      style={{
        fontSize: "2em",
        textAlign: "center",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {formattedTime}
    </div>
  );
}
