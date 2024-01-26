import React from "react";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  const formatTime = (
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
  ): string => {
    const hoursString = hours.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");
    const millisecondsString = milliseconds.toString().padStart(2, "0");
    return `${hoursString}:${minutesString}:${secondsString}.${millisecondsString}`;
  };
  const displayTime = () => {
    const milliseconds = Math.round((time % 1000) / 10);
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return formatTime(hours, minutes, seconds, milliseconds);
  };
  return (
    <div>
      <p>{displayTime()}</p>
    </div>
  );
}
