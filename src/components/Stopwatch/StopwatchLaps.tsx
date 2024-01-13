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
    <div data-state={laps.length > 0 ? "full" : "empty"} className='stopwatch-lap-list' data-testid='lap-list'>
      {laps.length > 0 && (
        <>
          <div className="stopwatch-lap-list-header">
            <span>Round</span>
            <span>Lap time</span>
          </div>
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

  return (
    <li>
      <span>{id}</span>
      {formattedDuration}
    </li>
  );
}

export type { Lap, StopwatchLapsProps };
