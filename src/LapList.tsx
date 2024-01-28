import React from "react";

import { getTimeBreakdown } from "./utils";
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
        <li key={lapTime}>
          <LapTime lapTime={lapTime} index={lapTimes.length - index} />
        </li>
      );
    })}
  </>
);

const RelativeLapList: React.FC<{ lapTimes: number[] }> = ({ lapTimes }) => (
  <>
    {lapTimes.map((lapTime, index) => {
      let prevLapTime = 0;
      if (index < lapTimes.length - 1) {
        prevLapTime = lapTimes[index + 1];
      }
      let timeElapsedSinceLastLap = lapTime - prevLapTime;
      return (
        <li key={lapTime}>
          <LapTime
            lapTime={timeElapsedSinceLastLap}
            index={lapTimes.length - index}
          />
        </li>
      );
    })}
  </>
);

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
