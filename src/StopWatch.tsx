// component that represents the stopwatch display
import React from "react";

import { convertToDisplayTime } from "./utils/timeDisplayUtils";

interface Props {
  timeElapsed: number;
  latestLapTime: number;
  lapTimes: number[];
  // pass stopWatchButton component as prop
  // so it can be displayed in between main timer and laps
  stopWatchButton: React.ReactNode;
}

export default function StopWatch({
  timeElapsed,
  latestLapTime,
  lapTimes,
  stopWatchButton,
}: Props) {
  return (
    <div>
      {/* stopwatch timer display */}
      <h1>{convertToDisplayTime(timeElapsed)}</h1>

      {/* stopwatch buttons */}
      {stopWatchButton}

      {/* lap times display */}
      {lapTimes.map((lapTime, index) => (
        <h1 key={index}>
          Lap {index + 1}: {convertToDisplayTime(lapTime)}
        </h1>
      ))}
    </div>
  );
}
