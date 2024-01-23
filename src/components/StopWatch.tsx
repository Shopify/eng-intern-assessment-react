import React from "react";
import functions from "../functions";
import "../styles.css";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  const [hours, minutes, seconds, centiseconds] = functions.getTimeComponents(time);
  return (
    <div>
      <span className="timer-large-text">
        {time >= 360000 ? hours + ":" : ""}
        {minutes}:{seconds}
      </span>
      <span className="timer-small-text">.{centiseconds}</span>
    </div>
  );
}
