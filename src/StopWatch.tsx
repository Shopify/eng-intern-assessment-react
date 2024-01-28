import React, { useState } from "react";
import StopWatchButton from "./StopWatchButton";

type LapType = {
  id: number;
  lapTime: number;
  timeElapsed: number;
}[];

/**
 * formats a given time value (number), into a readable string MM:SS:CC (minutes:seconds:centiseconds)
 *
 * @param time
 * @returns
 */
function formatTime(time: number) {
  const minutes = Math.floor(time / (100 * 60));

  time -= minutes * (100 * 60);
  const seconds = Math.floor(time / 100);
  // learned this word while researching about stopwatch - khurram
  time -= seconds * 100;
  const centisecond = time;

  const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const strSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const strCentisecond = centisecond < 10 ? `0${centisecond}` : centisecond;

  return `${strMinutes}:${strSeconds}:${strCentisecond}`;
}

export default function StopWatch() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [stopwatchIntervalId, setStopwatchIntervalId] =
    useState<NodeJS.Timer>(null);
  const [laps, setLaps] = useState<LapType>([]);

  function start() {
    if (stopwatchIntervalId) return;

    const intervalId = setInterval(() => {
      setTimeElapsed((state) => state + 1);
    }, 10);
    setStopwatchIntervalId(intervalId);
  }

  function stop() {
    clearInterval(stopwatchIntervalId);
    setStopwatchIntervalId(null);
  }

  function lap() {
    if (!stopwatchIntervalId) return;

    const lastLap = laps[0];
    const id = lastLap ? lastLap.id + 1 : 1;
    const lapTime = timeElapsed - (lastLap?.timeElapsed ?? 0);

    const newLap = {
      id,
      lapTime,
      timeElapsed,
    };

    setLaps((state) => [newLap, ...state]);
  }

  function reset() {
    stop();
    setLaps([]);
    setTimeElapsed(0);
  }

  return (
    <div>
      <div className="watch" data-testid="watch">
        {formatTime(timeElapsed)}
      </div>
      <StopWatchButton start={start} stop={stop} reset={reset} lap={lap} />
      {laps.length > 0 && (
        <div className="laps">
          {laps.map(({ id, lapTime, timeElapsed }) => (
            <div className="lap" key={id}>
              <span>{`#${id}`}</span>
              <time>{formatTime(lapTime)}</time>
              <time>{formatTime(timeElapsed)}</time>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
