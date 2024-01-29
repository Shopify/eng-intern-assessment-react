import React from "react";
import { getTimeComponentsFromMs } from "../utils/timeConversion";

export default function LapDisplay({
  laps,
  minLapIndex,
  maxLapIndex,
}: {
  laps: number[];
  minLapIndex: number | null;
  maxLapIndex: number | null;
}) {
  const formattedLaps = laps
    ? laps.map((lap: number) => getTimeComponentsFromMs(lap))
    : [];

  const getLapStyle = (index: number) => {
    if (minLapIndex == maxLapIndex || laps.length <= 2) {
      return {};
    }
    if (index === minLapIndex) {
      return { color: "green" };
    } else if (index === maxLapIndex) {
      return { color: "red" };
    } else {
      return {};
    }
  };

  return (
    <div className="laps-holder">
      <div className="header">
        <h2>Lap No.</h2>
        <h2>Split Time</h2>
      </div>
      <div className="body" data-testid="laps-holder-body">
        {formattedLaps.reverse().map((lap, i) => {
          const reversedIndex = formattedLaps.length - i;
          return (
            <div className="row">
              <p style={getLapStyle(reversedIndex - 1)}>Lap {reversedIndex}</p>
              <p style={getLapStyle(reversedIndex - 1)}>{lap.join(":")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
