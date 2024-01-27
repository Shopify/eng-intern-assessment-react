import React from "react";
import { getTimeComponentsFromMs } from "../utils/timeConversion";

export default function LapDisplay({ laps }: { laps: number[] }) {
  const formattedLaps = laps
    ? laps.map((lap: number) => getTimeComponentsFromMs(lap))
    : [];
  return (
    <div>
      <h1>Laps</h1>
      <div>
        {formattedLaps.map((lap, i) => {
          return (
            <div>
              <p>Lap {i + 1}</p>
              <p>{lap.join(":")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
