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
    <div>
      <div>
        {formattedLaps.reverse().map((lap, i) => {
          const reversedIndex = formattedLaps.length - i;
          return (
            <div>
              <p style={getLapStyle(reversedIndex - 1)}>Lap {reversedIndex}</p>
              <p style={getLapStyle(reversedIndex - 1)}>{lap.join(":")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
