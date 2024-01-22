import React from "react";
import { formatTime } from "../utils/formatTime";

interface SavedLapsProps {
  lappedTotalTimes: number[];
}

const SavedLaps = ({ lappedTotalTimes }: SavedLapsProps) => {
  const calcLappedLocalTime = (lapEndTime: number) => {
    const endIndex = lappedTotalTimes.indexOf(lapEndTime);
    const lapStartTime =
      endIndex === lappedTotalTimes.length - 1
        ? 0
        : lappedTotalTimes[endIndex + 1];

    return lapEndTime - lapStartTime;
  };

  const displayLappedTime = (time: number) => {
    const lappedLocalTime = calcLappedLocalTime(time);
    return formatTime(lappedLocalTime);
  };

  return (
    <table className="lapped">
      <tr>
        <th>Lap</th>
        <th>Lap Time</th>
        <th>Total Time</th>
      </tr>
      {lappedTotalTimes.map((totalTime, index) => (
        <tr>
          <th>{lappedTotalTimes.length - index}</th>
          <th>{displayLappedTime(totalTime)}</th>
          <th>{formatTime(totalTime)}</th>
        </tr>
      ))}
    </table>
  );
};

export default SavedLaps;
