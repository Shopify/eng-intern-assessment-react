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
      <p>{props.lap.number}</p>
      <p>{props.lap.interval}</p>
      <p>{props.lap.time}</p>
    </div>
  );
}
