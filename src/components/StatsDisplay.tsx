import React from "react";
import { useStopWatch } from "./StopWatchContext";
import "./../css/NESBackground.css";
import "./../css/StatsDisplay.css";

import NESBackground from "./NESBackground";

// display current running/stopwatch stats on gamescene component
const StatsDisplay: React.FC = () => {
  // stopwatch context hook to access laps and format functions
  const { time, distance, currentLap, workout, formatTime, formatDistance } =
    useStopWatch();

  return (
    <div
      className="stats-display-container"
      role="complementary"
      aria-label="Game statistics"
    >
      {/* container for stats display for current run stats, with ARIA attributes for screenreaders */}
      <NESBackground size="small">
        <h2 id="stats-heading">« Stats »</h2>
        <div role="group" aria-labelledby="stats-heading">
          <div className="stats-text" aria-label={`Time: ${formatTime(time)}`}>
            Time: {formatTime(time)}
          </div>
          <div
            className="stats-text"
            aria-label={`Lap Distance: ${formatDistance(distance)}`}
          >
            Lap Distance: {formatDistance(distance)}
          </div>
          <div
            className="stats-text"
            aria-label={`Lap Time: ${formatTime(currentLap)}`}
          >
            Lap Time: {formatTime(currentLap)}
          </div>
          <div className="stats-text" aria-label={`Workout Level: ${workout}`}>
            Workout Level: {workout}
          </div>
        </div>
      </NESBackground>
    </div>
  );
};

export default StatsDisplay;
