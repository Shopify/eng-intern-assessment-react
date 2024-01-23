import React from "react";
import { formatTime } from "../utils/FormatTime";

interface SavedLapsProps {
  lappedTotalTimes: number[];
}

/* Component for rendering lapped times in a table */
const SavedLaps = ({ lappedTotalTimes }: SavedLapsProps) => {
  // Calculates the duration of the CURRENT lap
  // by finding time @ current lap press minus time @ previous lap press
  const calcLappedLocalTime = (lapEndTime: number) => {
    const endIndex = lappedTotalTimes.indexOf(lapEndTime);
    const lapStartTime =
      endIndex === lappedTotalTimes.length - 1
        ? 0
        : lappedTotalTimes[endIndex + 1]; // lapped times are sorted from newer to older

    return lapEndTime - lapStartTime;
  };

  return (
    <table className="lapped">
      <thead>
        <tr>
          <th>Lap</th>
          <th>Lap Time</th>
          <th>Total Time</th>
        </tr>
      </thead>
      <tbody role="tbody">
        {lappedTotalTimes.map((totalTime, index) => (
          <tr className="tableBody" key={index}>
            <th>{lappedTotalTimes.length - index}</th>
            <th>{formatTime(calcLappedLocalTime(totalTime))}</th>
            <th>{formatTime(totalTime)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SavedLaps;
