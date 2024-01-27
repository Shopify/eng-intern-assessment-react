import React from "react";

import { formatTime } from "./utils";

// define custom type ViewType to restrict the value of the viewType prop to only one of two options:
type ViewType = "absolute" | "relative";

// define props
interface LapListProps {
  lapList: number[];
  viewType: ViewType;
}

const AbsoluteLapList: React.FC<{ lapList: number[] }> = ({ lapList }) => (
  <>
    {lapList
      .slice()
      .reverse()
      .map((lap) => (
        <li key={`lap-at-${lap}-ms`}>{formatTime(lap)}</li>
      ))}
  </>
);

const RelativeLapList: React.FC<{ lapList: number[] }> = ({ lapList }) => (
  <>
    {lapList
      .slice()
      .reverse()
      .map((lap, index, reversedLaps) => {
        let timeElapsedSinceLastLap =
          index === reversedLaps.length - 1
            ? lap
            : lap - reversedLaps[index + 1];
        return (
          <li key={`lap-at-${lap}-ms`}>
            {formatTime(timeElapsedSinceLastLap)}
          </li>
        );
      })}
  </>
);

const LapList: React.FC<LapListProps> = ({ lapList, viewType }) => {
  return (
    <ol reversed>
      {viewType === "absolute" ? (
        <AbsoluteLapList lapList={lapList} />
      ) : (
        <RelativeLapList lapList={lapList} />
      )}
    </ol>
  );
};

export default LapList;
