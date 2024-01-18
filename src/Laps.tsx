import React from "react";
import styles from "./Laps.module.css";
import { formatElapsedTime } from "./utils";

interface StopWatchLapTimesProps {
  lapTimes: number[];
}

export default function StopWatchLapTimes({
  lapTimes,
}: StopWatchLapTimesProps) {
  if (lapTimes.length === 0) return null;

  return (
    <div data-testid="lap-list" className={styles.container}>
      {lapTimes.map((lapTime, index) => (
        <p key={index}>
          Lap {index + 1}: {formatElapsedTime(lapTime)}
        </p>
      ))}
    </div>
  );
}
