import React from "react";

import Lap from "./Lap";

interface LapListProps {
  lapTimes: number[];
}

const LapList: React.FC<LapListProps> = ({ lapTimes: totalLapTimes }) => {
  const relativeLapTimes = totalLapTimes.map((lapTime, index) => {
    let prevLapTime = 0;
    if (index < totalLapTimes.length - 1) {
      prevLapTime = totalLapTimes[index + 1];
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
      <ol>
        {totalLapTimes.map((totalLapTime, index) => {
          let prevLapTime = 0;
          if (index < totalLapTimes.length - 1) {
            prevLapTime = totalLapTimes[index + 1];
          }
          const relativeLapTime = totalLapTime - prevLapTime;
          return (
            <li
              key={`${totalLapTime}-${index}`}
              className={
                relativeLapTime === bestTime
                  ? " text-green-600"
                  : relativeLapTime === worstTime
                  ? " text-red-500"
                  : ""
              }
            >
              <Lap
                totalLapTime={totalLapTime}
                relativeLapTime={relativeLapTime}
                index={totalLapTimes.length - index}
              />
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default LapList;
