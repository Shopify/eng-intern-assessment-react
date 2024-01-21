import React from "react";

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

  const formatTime = (time: number) => {
    // 0 is padded to account for where the time does not have 2 digits
    // slice is used to ensure only 2 digits are used
    const hours = ("0" + Math.floor(time / (60 * 60 * 1000))).slice(-2);
    const minutes = ("0" + Math.floor((time / (60 * 1000)) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const ms = ("0" + Math.floor((time / 10) % 100)).slice(-2);

    return `${hours}:${minutes}:${seconds}.${ms}`;
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
