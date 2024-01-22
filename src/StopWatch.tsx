import React from "react";
import { TimeComponents } from "./types";

interface StopWatchProps {
  timeComponents: TimeComponents;
}

export default function StopWatch({
  timeComponents: [hours, minutes, seconds, centiseconds],
}: StopWatchProps) {
  return (
    <div>
      <span>
        {hours === "00" ? "" : hours + ":"}
        {minutes}:{seconds}
      </span>
      <span>.{centiseconds}</span>
    </div>
  );
}
