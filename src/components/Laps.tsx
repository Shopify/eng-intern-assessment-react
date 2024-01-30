import React from "react";
import { displayTime } from "./utils";

interface LapsProps {
  laps: string[];
  currentLap: number;
  hasStartedStopwatch: boolean;
}

export default function Laps({
  laps,
  currentLap,
  hasStartedStopwatch,
}: LapsProps) {
  return (
    <div>
      <h2 className="subtitle">Laps</h2>
      {laps.map((lap, index) => (
        // for each lap we want to display the lap time and the lap number it is
        <div className="lap-display" key={`lap_${index}`}>
          <p>Lap {index + 1}</p>
          <p>{lap}</p>
        </div>
      ))}
      {
        // if the stopwatch as started then we want to display the time elapsed for the current lap
        hasStartedStopwatch ? (
          <div className="lap-display">
            <p>Lap {laps.length + 1}</p>
            <p>{displayTime(currentLap)}</p>
          </div>
        ) : null
      }
    </div>
  );
}
