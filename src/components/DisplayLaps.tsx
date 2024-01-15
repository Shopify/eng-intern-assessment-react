import React from "react";

export default function DisplayLaps({ laps }: { laps: string[] }) {
  return (
    <div>
      {laps.map((lap, i) => (
        <div key={i}>{lap}</div>
      ))}
    </div>
  );
}
