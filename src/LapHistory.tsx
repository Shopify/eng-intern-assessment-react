import Lap from "./Lap";
import React from "react";

export default function LapHistory({
  laps,
  bestTime,
  worstTime,
}: {
  laps: string[];
  bestTime: string;
  worstTime: string;
}) {
  return (
    <div>
      {laps.map((lap: string, index: number) => {
        return (
          <Lap
            key={index}
            lapElapsed={lap}
            lapIndex={laps.length - index}
            isBestTime={laps.length > 1 && lap === bestTime}
            isWorstTime={laps.length > 1 && lap === worstTime}
          />
        );
      })}
    </div>
  );
}
