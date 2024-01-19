import React from "react";
import { formatElapsedTime } from "./utils";
import Stack from "./Stack";

interface StopWatchLapTimesProps {
  lapTimes: number[];
}

export default function StopWatchLapTimes({
  lapTimes,
}: StopWatchLapTimesProps) {
  if (lapTimes.length === 0) return null;

  return (
    <Stack data-testid="lap-list">
      {lapTimes.map((lapTime, index) => (
        <p key={index}>
          Lap {index + 1}: {formatElapsedTime(lapTime)}
        </p>
      ))}
    </Stack>
  );
}
