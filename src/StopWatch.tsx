import React, { useEffect } from "react";
import { StopWatchState } from "./lib/stopwatchState";

interface StopWatchProps {
  state: StopWatchState;
}

export default function StopWatch({ state }: StopWatchProps) {
  const [t, setT] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("tick");
      setT(performance.now());
    }, 10);
    return () => clearInterval(interval);
  });

  const timeElapsed =
    state.lapTimes.reduce((a, b) => a + b, 0) +
    state.currentLapTime +
    (state.active ? performance.now() - state.lapStartTime : 0);

  return (
    <div>
      <h1>Time</h1>
      <div>
        <span>{Math.floor(timeElapsed / 1000)}</span>
        <span>.</span>
        <span>{Math.floor(timeElapsed / 100) % 10}</span>
        <span>{Math.floor(timeElapsed / 10) % 10}</span>
        <span>{Math.floor(timeElapsed / 1) % 10}</span>
      </div>

      {/* <div>{state.accumulatedTimeMs}</div> */}
      <h2>Laps</h2>
      <div>
        {state.lapTimes.map((lap, i) => (
          <div key={i}>
            <span>{lap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
