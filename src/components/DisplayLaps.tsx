import React from "react";

export default function DisplayLaps({ laps }: { laps: string[] }) {
  return (
    <div data-testid="lap-list">
      {laps.map((lap, i) => (
        <div
          key={i}
          style={{
            fontSize: "20px",
            marginTop: "10px",
          }}
        >
          Lap {i + 1}: {lap}
        </div>
      ))}
    </div>
  );
}
