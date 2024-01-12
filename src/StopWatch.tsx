import React from "react";

interface StopWatchInterface {
  time: string;
}

export default function StopWatch({ time }: StopWatchInterface) {
  return (
    <div>
      <h2>{time}</h2>
    </div>
  );
}
