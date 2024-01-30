import React from "react";
import { getTimeComponentsFromMs } from "../utils/timeConversion";
import { LapColour } from "../constants/constants";
import { MINIMUM_LAPS_THRESHOLD } from "../constants/constants";

type LapDisplayProps = {
  laps: number[];
  minLapIndex: number | null;
  maxLapIndex: number | null;
};

export default function LapDisplay({
  laps,
  minLapIndex,
  maxLapIndex,
}: LapDisplayProps) {
  const formattedLapTimes = laps
    ? laps.map((lap: number) => getTimeComponentsFromMs(lap))
    : [];

  //This function returns color green for minLap and red for maxLap
  const getLapStyle = (index: number) => {
    if (minLapIndex == maxLapIndex || laps.length <= MINIMUM_LAPS_THRESHOLD) {
      return {};
    }
    if (index === minLapIndex) {
      return { color: LapColour.green };
    } else if (index === maxLapIndex) {
      return { color: LapColour.red };
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
        {/* Reversing the array to display the most recent lap on top*/}
        {formattedLapTimes.reverse().map((lap, i) => {
          const reversedIndex = formattedLapTimes.length - i;
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
