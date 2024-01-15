import React, { useEffect, useState } from "react";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, time]);

  return (
    <div>
      <h2>Stopwatch Display</h2>
      <h1>{time}</h1>
    </div>
  );
}
