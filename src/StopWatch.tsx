import React from "react";

// This component focuses on the logic of converting "time" into a readable format (minutes, hr, seconds)
export default function StopWatch({
  time,
  laps,
}: {
  time: number;
  laps: number[];
}) {
  const formatTime = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsPart = (milliseconds % 1000).toFixed(0).padStart(3, "0");

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${millisecondsPart}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}
