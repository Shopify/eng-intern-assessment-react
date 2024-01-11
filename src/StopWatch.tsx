import React from "react";

interface StopWatchProps {
  time: number;
}

// convert the time to a more friendly format
const formatTime = (time: number) => {
  const seconds = String(time % 60).padStart(2, "0");
  const minutes = String(Math.floor((time / 60) % 60)).padStart(2, "0");
  const hours = String(Math.floor(time / (60 * 60))).padStart(2, "0");

  return hours + ":" + minutes + ":" + seconds;
};

export default function StopWatch({ time }: StopWatchProps) {
  return <h1 className="timer-display">{formatTime(time)}</h1>;
}
