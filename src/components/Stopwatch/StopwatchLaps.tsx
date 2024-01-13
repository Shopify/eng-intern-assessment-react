import React from "react";
import { formatTime, formattedTimeToString } from "../../lib/formatting/time";

type Lap = {
  id: number;
  duration: number;
  elapsed: number;
};

type StopwatchLapsProps = {
  laps: Array<Lap>;
};

export default function StopwatchLaps({ laps }: StopwatchLapsProps) {
  return (
    <div>
      <h2>Laps</h2>
      {laps.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Duration</th>
              <th>Elapsed</th>
            </tr>
          </thead>
          <tbody>
            {laps.map((lap) => (
              <StopwatchLap key={lap.id} {...lap} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

type StopwatchLapProps = {} & Lap;

function StopwatchLap({ id, duration, elapsed }: StopwatchLapProps) {
  const formattedDuration = React.useMemo(() => {
    return formattedTimeToString(formatTime(duration));
  }, [duration]);

  const formattedElapsed = React.useMemo(() => {
    return formattedTimeToString(formatTime(elapsed));
  }, [elapsed]);

  return (
    <tr>
      <td>{id}</td>
      <td>{formattedDuration}</td>
      <td>{formattedElapsed}</td>
    </tr>
  );
}

export type { Lap, StopwatchLapsProps };
