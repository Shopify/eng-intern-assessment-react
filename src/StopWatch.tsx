import React from "react";
import { useState } from "react";


// A function that takes a total time in seconds and formats it into the "HH:MM:SS" time format
const formatTime = (time: number) => {
  // Calculate the number of hours by dividing total seconds by 3600 (60 seconds/minute * 60 minutes/hour)
  const hours = Math.floor(time / 3600);
  // Calculate the number of minutes by taking the remaining seconds after subtracting the hours, and then dividing by 60
  const minutes = Math.floor((time % 3600) / 60);
  // Calculate the remaining seconds by taking the modulus of total seconds divided by 60
  const remainingSeconds = time % 60;
  // Combine hours, minutes, and remaining seconds into a formatted time string ("HH:MM:SS")
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  return formattedTime;
};

export default function StopWatch() {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  return <section>{<div className="stopwatch-time">{formatTime(elapsedTime)}</div>}</section>;
}