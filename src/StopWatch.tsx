import React from "react";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  const format = (): string => {
    const hour = Math.floor(time / 1000 / 60 / 60)
      .toString()
      .padStart(2, "0");
    const min = Math.floor((time / 1000 / 60) % 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const ms = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${hour}:${min}:${sec}:${ms}`;
  };

  return <div>{format()}</div>;
}
