import React from "react";
import StopWatchButton from "./StopWatchButton";
import { useState } from "react";

export default function StopWatch() {
  const [displayedTime, setDisplayedTime] = useState<string>("00:00");

  return (
    <div>
      <StopWatchButton title={"Start/Stop"} />
      <StopWatchButton title={"Reset"} />
      <StopWatchButton title={"Lap"} />
      <div className="clock-container">{displayedTime}</div>
    </div>
  );
}
