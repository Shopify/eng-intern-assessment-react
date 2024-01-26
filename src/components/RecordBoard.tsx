import React from "react";
import { useStopWatch } from "./StopWatchContext";

import NESBackground from "./NESBackground";

const RecordBoard: React.FC = () => {
  const { laps, formatTime, formatDistance } = useStopWatch();

  return (
    <NESBackground size="medium">
      <h2>« Record Board »</h2>
      <div className="record-board-content">
        {laps
          .slice()
          .reverse() // Reverse to display the most recent laps first
          .map((lap, index) => (
            <div key={index}>
              Lap {laps.length - index}: {formatTime(lap.time)},{" "}
              {formatDistance(lap.distance)}
            </div>
          ))}
      </div>
    </NESBackground>
  );
};

export default RecordBoard;
