import Lap from "./Lap";
import React from "react";

export default function LapHistory({
  laps,
  bestLap,
  worstLap,
}: {
  laps: string[];
  bestLap: string;
  worstLap: string;
}) {
  return (
    <div data-testid="lap-list">
      {laps.map((lap: string, index: number) => {
        return (
          <Lap
            key={index}
            lapElapsed={lap}
            lapIndex={laps.length - index}
            isBestLap={laps.length > 1 && lap === bestLap}
            isWorstLap={laps.length > 1 && lap === worstLap}
          />
        );
      })}
    </div>
  );
}
