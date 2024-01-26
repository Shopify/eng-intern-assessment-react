import React from "react";

export interface Lap {
  number: number;
  interval: string;
  time: string;
}

//StopWatch handles lap rendering timing functionality.
export default function LapItem(props: { key: number; lap: Lap }) {
  return (
    <div className="lap">
      <p className="lap-number">{props.lap.number}</p>
      <p className="lap-time">{props.lap.interval}</p>
      <p className="lap-time">{props.lap.time}</p>
    </div>
  );
}
