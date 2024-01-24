import React from "react";
import functions from "../functions";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  const [sign, hours, minutes, seconds, centiseconds] = functions.getTimeComponents(time);
  return (
    <div>
      <span className="timer-large-text" data-testid="h-m-s">
        {sign}
        {time >= 360000 ? hours + ":" : ""}
        {minutes}:{seconds}
      </span>
      <span className="timer-small-text" data-testid="cs">
        .{centiseconds}
      </span>
    </div>
  );
}
