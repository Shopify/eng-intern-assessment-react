import React from "react";

export default function LapItem({
  lapTime,
  index,
}: {
  lapTime: number;
  index: number;
}) {
  // Calculate hours
  const hours = Math.floor(lapTime / 36000);
  // Calculate minutes
  const minutes = Math.floor((lapTime % 360000) / 6000);
  // Calculate seconds
  const seconds = Math.floor((lapTime % 6000) / 100);
  // Calculate milliseconds
  const milliseconds = lapTime % 100;

  return (
    <div className="lap-row">
      <div>Lap {index}</div>
      <div className="lap-time-container">
        <div>{hours}h</div>
        <div>{minutes}m</div>
        <div>{seconds}s</div>
        <div>{milliseconds}</div>
      </div>
    </div>
  );
}
