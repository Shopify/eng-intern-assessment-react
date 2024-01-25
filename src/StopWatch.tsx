import React, { useRef, useState } from "react";

//define time proportions
const msInSecond = 1000;
const secondsInMinute = 60;
const minutesInHour = 60;
const msInMinute = secondsInMinute * msInSecond;
const msInHour = minutesInHour * msInMinute;

//StopWatch handles all timing functionality.
export default function StopWatch() {
  //lastTick is used to improve reliability in the actual calculation of duration in milliseconds
  const lastTick = useRef(null);
  const [duration, setDuration] = useState<number | null>(null);

  //startTime calculates and sets the total duration of the timer in milliseconds.
  const startTime = () => {
    lastTick.current = Date.now();
    window.setInterval(() => {
      const now = Date.now();
      const deltaTime = now - lastTick.current;
      setDuration((d) => d + deltaTime);
      lastTick.current = now;
    }, 1);
  };

  startTime();

  return <p>{duration}</p>;
}
