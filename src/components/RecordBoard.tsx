import React from "react";
import { useStopWatch } from "./StopWatchContext";
import NESBackground from "./NESBackground";
import "./../css/Fonts.css";

const RecordBoard: React.FC = () => {
  // stopwatch context hook to access laps and format functions
  const { laps, formatTime, formatDistance } = useStopWatch();

  return (
    <NESBackground size="medium">
      <h2 id="record-board-title">« Record Board »</h2>

      {/* container for record board laps */}
      <div
        className="record-board-content"
        role="list"
        aria-labelledby="record-board-title"
        aria-live="polite" // dynamically updates content in an accessible way
      >
        {laps
          .slice()
          .reverse() // reverse to display the most recent laps first
          .map((lap, index) => (
            <div key={index} role="listitem">
              {/* display lap number, time and distance */}
              Lap {laps.length - index}: {formatTime(lap.time)},{" "}
              {formatDistance(lap.distance)}
            </div>
          ))}
      </div>
    </NESBackground>
  );
};

export default RecordBoard;
