import React from "react";

import LapTime from "./LapTime";

export type LapViews = "absolute" | "relative";

interface LapListProps {
  lapTimes: number[];
  viewType: LapViews;
}

const AbsoluteLapList: React.FC<{ lapTimes: number[] }> = ({ lapTimes }) => (
  <>
    {lapTimes.map((lapTime, index) => {
      return (
        <li key={`${lapTime}-${index}`}>
          <LapTime lapTime={lapTime} index={lapTimes.length - index} />
        </li>
      );
    })}
  </>
);

const RelativeLapList: React.FC<{ lapTimes: number[] }> = ({ lapTimes }) => {
  const relativeLapTimes = lapTimes.map((lapTime, index) => {
    let prevLapTime = 0;
    if (index < lapTimes.length - 1) {
      prevLapTime = lapTimes[index + 1];
    }
    return lapTime - prevLapTime;
  });
  let bestTime: number = null;
  let worstTime: number = null;

  if (relativeLapTimes.length >= 2) {
    bestTime = Math.min(...relativeLapTimes);
    worstTime = Math.max(...relativeLapTimes);
  }

  return (
    <>
      {relativeLapTimes.map((lapTime, index) => (
        <li
          key={`${lapTime}-${index}`}
          className={
            lapTime === bestTime
              ? " text-green-600"
              : lapTime === worstTime
              ? " text-red-500"
              : ""
          }
        >
          <LapTime lapTime={lapTime} index={relativeLapTimes.length - index} />
        </li>
      ))}
    </>
  );
};

const LapList: React.FC<LapListProps> = ({ lapTimes, viewType }) => {
  return (
    <ol>
      {viewType === "absolute" ? (
        <AbsoluteLapList lapTimes={lapTimes} />
      ) : (
        <RelativeLapList lapTimes={lapTimes} />
      )}
    </ol>
  );
};

export default LapList;
