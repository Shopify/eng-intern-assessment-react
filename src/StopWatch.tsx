import React, { useEffect, useState } from "react";

interface Lap {
  id: number;
  time: number;
}

interface stopWatchProps {
  isRunning: boolean;
  time: number;
  laps: Lap[];
}

const StopWatch: React.FC<stopWatchProps> = ({ isRunning, time, laps }) => {
  return (
    <div>
      <h1>StopWatch!!</h1>
      <p>Time: {time}s</p>
      {laps.length > 0 && (
        <div>
          <h2>Laps</h2>
          <ul>
            {laps.map((lap) => (
              <li key={lap.id}>
                Lap {lap.id}: {lap.time}s
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StopWatch;