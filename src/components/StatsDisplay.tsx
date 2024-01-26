import React from "react";
import { useStopWatch } from "./StopWatchContext";
import NESBackground from "./NESBackground";
import "./../css/NESBackground.css";
import "./../css/StatsDisplay.css";

const StatsDisplay: React.FC = () => {
  const { time, distance, currentLap, workout, formatTime, formatDistance } =
    useStopWatch();

  return (
    <div className="stats-display-container">
      <NESBackground size="small">
        <div className="stats-header">Stats</div>
        <div className="stats-text">Time: {formatTime(time)}</div>
        <div className="stats-text">Lap Distance: {formatDistance(distance)}</div>
        <div className="stats-text">Lap Time: {formatTime(currentLap)}</div>
        <div className="stats-text">Workout Level: {workout}</div>
      </NESBackground>
    </div>
  );
};

export default StatsDisplay;
