import React, { useEffect, useState } from "react";

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isPaused, time]);

  const formatTime = (totalMilSeconds: number) => {
    const milliseconds = Math.floor((totalMilSeconds / 10) % 1000);
    const seconds = Math.floor((totalMilSeconds / 1000) % 60);
    const minutes = Math.floor((totalMilSeconds / 60000) % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds)
      .padStart(2, "0")
      .slice(-2);

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "black",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        <h1 style={{ color: "white", fontSize: "64px" }}>{formatTime(time)}</h1>
      </div>
    </div>
  );
}
