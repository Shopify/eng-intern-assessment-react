import React from "react";
import LapItem from "./LapItem";

export default function LapList({ laps }: { laps: Array<number> }) {
  // Render list of laps it is not empty
  const showLaps = laps.length > 0;

  return (
    <div className="lap-list">
      {showLaps &&
        laps.map((lapTime, index) => (
          <LapItem key={index} index={index} lapTime={lapTime} />
        ))}
    </div>
  );
}
