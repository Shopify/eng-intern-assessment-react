import React from "react";
import StopwatchButton from "./StopWatchButton";

interface StopwatchProps {
  elapsedTime: number;
  isRunning: boolean;
  laps: Array<{ id: number; time: number }>;
  startStop: () => void;
  reset: () => void;
  recordLap: () => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({
  elapsedTime,
  isRunning,
  laps,
  startStop,
  reset,
  recordLap,
}) => {
  const formatTime = (time: number): string => {
    const milliseconds = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60));

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(milliseconds).padStart(3, "0")}`;
  };

  return (
    <div>
      <p>{formatTime(elapsedTime)}</p>
      <StopwatchButton
        isRunning={isRunning}
        startStop={startStop}
        reset={reset}
        recordLap={recordLap}
      />
      <div>
        <h3>Laps</h3>
        <ul>
          {laps.map((lap) => (
            <li key={lap.id}>
              Lap {lap.id}: {formatTime(lap.time)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
