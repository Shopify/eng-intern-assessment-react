import React from "react";
import "./main.css";

// Define the structure of a lap object
interface Lap {
  id: number;
  time: number;
}

// Define the props for the StopWatch component
interface StopWatchProps {
  isRunning: boolean;
  time: number;
  laps: Lap[];
}

// Helper function to format time in mm:ss:ms format
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

// StopWatch component
const StopWatch: React.FC<StopWatchProps> = ({ isRunning, time, laps }) => {
  return (
    <div className="stopwatch_container">
      {/* Display the formatted time */}
      <p>{formatTime(time)}</p>
      {/* Display the lap list if there are laps recorded */}
      {laps.length > 0 && (
        <div className="lap_list">
          <ul>
            {/* Map through laps and display lap details */}
            {laps.map((lap) => (
              <li key={lap.id}>
                #{lap.id} {formatTime(lap.time)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatch;
