import React, { useEffect, useState } from "react";
import "./main.css";

interface Lap {
  id: number;
  time: number;
}

interface stopWatchProps {
  isRunning: boolean;
  time: number;
  laps: Lap[];
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

const StopWatch: React.FC<stopWatchProps> = ({ isRunning, time, laps }) => {
  return (
    <div className="stopwatch_container">
      <p>{formatTime(time)}</p>
      {laps.length > 0 && (
        <div className="lap_list">
          <ul>
            {laps.map((lap) => (
              <li key={lap.id}>
                #{lap.id} {formatTime(lap.time)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatch;
