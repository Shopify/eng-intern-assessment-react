import React from "react";
import functions from "../functions";

interface LapsDisplayProps {
  laps: number[];
}

export default function LapsDisplay({ laps }: LapsDisplayProps) {
  return (
    <div className="laps-container">
      <div className="lap-row-container">
        <div className="lap-index extra-small-text">Lap</div>
        <div className="lap-time extra-small-text">Time</div>
      </div>
      <hr className="lap-divider" />
      {laps.map((lap, index) => (
        <div className="lap-row-container" key={index}>
          <div className="lap-index extra-small-text">{index + 1}</div>
          <div className="lap-time extra-small-text">{functions.timeToString(lap)}</div>
        </div>
      ))}
    </div>
  );
}
