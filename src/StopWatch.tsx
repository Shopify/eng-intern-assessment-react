import React from "react";
import { useState } from "react";

interface StopWatchProps {
  timer: number;
  laps: number[];
}

const displayTime = (timer: number): string =>
  `${String(Math.floor((timer / 60000) % 60)).padStart(2, "0")}:${String(
    Math.floor((timer / 1000) % 60)
  ).padStart(2, "0")}:${String(Math.floor((timer / 10) % 100)).padStart(
    2,
    "0"
  )}`;

const StopWatch: React.FC<StopWatchProps> = ({ timer, laps }) => {
  return (
    <div>
      <div className="timer">{displayTime(timer)}</div>
      <ul>
        {laps?.map((lap, index) => (
          <li key={`lap-${lap}-${index}`}>
            Lap {index + 1}: {displayTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopWatch;