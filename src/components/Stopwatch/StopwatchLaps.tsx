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
    <div id='lap-list' data-testid='lap-list'>
      {laps.length > 0 && (
        <>
          <h2>Laps</h2>
          <ul>
            {laps.map((lap) => (
              <StopwatchLap key={lap.id} {...lap} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

type StopwatchLapProps = {} & Lap;

function StopwatchLap({ id, duration, elapsed }: StopwatchLapProps) {
  const formattedDuration = React.useMemo(() => {
    return formattedTimeToString(formatTime(duration));
  }, [duration]);

  return <li>{formattedDuration}</li>;
}

export type { Lap, StopwatchLapsProps };
