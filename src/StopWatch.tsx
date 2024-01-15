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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
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
