import React from "react";
import { formatTime } from "../../utils/formatTime";
type StopWatchProps = {
  laps?: number[];
  currentTime: string;
};
export function StopWatch({ currentTime, laps }: StopWatchProps) {
  return (
    <div>
      <div>{currentTime}</div>
      {laps.length > 0 && (
        <ul>
          {laps.map((currLap, i) => (
            <li>
              Lap {i + 1}: {formatTime(currLap)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
