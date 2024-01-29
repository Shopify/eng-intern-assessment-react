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
      <h2>Laps</h2>
      {laps.map((lap, index) => (
        <div key={`lap_${index}`}>
          <p>Lap {index + 1}</p>
          <p>{lap}</p>
        </div>
      ))}
      {hasStartedStopwatch ? (
        <div>
          <p>Lap {laps.length + 1}</p>
          <p>{displayTime(currentLap)}</p>
        </div>
      ) : null}
    </div>
  );
}
