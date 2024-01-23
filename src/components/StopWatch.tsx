import React from "react";
import functions from "../functions";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  const [hours, minutes, seconds, centiseconds] = functions.getTimeComponents(time);
  return (
    <div>
      <span>
        {time >= 360000 ? hours + ":" : ""}
        {minutes}:{seconds}
      </span>
      <span>.{centiseconds}</span>
    </div>
  );
}
