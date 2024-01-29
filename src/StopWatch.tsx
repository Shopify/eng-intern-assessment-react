import React, { useEffect } from "react";
import { initialState, reducer } from "./lib/stopwatchState";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  // stopwatch state machine
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // refs for DOM elements, these are useful to live update the UI
  // without having to re-render the component. This is a performance
  // optimization.
  const timerRef = React.useRef<HTMLDivElement>(null);
  const activeLapRef = React.useRef<HTMLTableCellElement>(null);

  // we use this ref to store the animation frame id
  // this is a great way to cancel the animation frame
  // when needed, but also to avoid re-rendering the component
  // on each animation frame
  const animRef = React.useRef<number>(null);

  // memoized values, these are useful to live update the UI
  const prevLapTimes = React.useMemo(
    () => state.lapTimes.reduce((a, b) => a + b, 0),
    [state.lapTimes]
  );

  const showLiveTime = React.useCallback(() => {
    // the current lap time, in milliseconds
    const lapTime =
      state.currentLapTime +
      (state.active ? performance.now() - state.lapStartTime : 0);

    // the total time since last reset (or initial state), in milliseconds
    const totalTime = prevLapTimes + lapTime;

    if (timerRef.current) {
      timerRef.current.textContent = formatTime(totalTime);
    }

    if (activeLapRef.current) {
      activeLapRef.current.textContent = formatTime(lapTime);
    }

    // we don't want to keep updating the UI if the stopwatch is not active
    // the above code will re-run on state change, so stop/reset will still
    // display updated ui but not animate
    if (!state.active) {
      return;
    }

    animRef.current = requestAnimationFrame(showLiveTime);
  }, [state]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(showLiveTime);

    // cleanup the animation frame based on the ref
    return () => cancelAnimationFrame(animRef.current);
  }, [showLiveTime]);

  return (
    <div className="grid w-full h-full max-w-lg gap-8 m-auto grid-rows-12">
      <div
        className="flex items-center justify-center row-span-2 text-6xl font-bold"
        ref={timerRef}
      ></div>

      <div className="flex row-span-2 gap-4">
        {state.active ? (
          <>
            <StopWatchButton
              className="flex-1"
              onClick={() => dispatch("stop")}
            >
              Stop
            </StopWatchButton>
            <StopWatchButton className="flex-1" onClick={() => dispatch("lap")}>
              Lap
            </StopWatchButton>
          </>
        ) : (
          <>
            <StopWatchButton
              className="flex-1"
              onClick={() => dispatch("start")}
            >
              Start
            </StopWatchButton>
            <StopWatchButton
              className="flex-1"
              onClick={() => dispatch("reset")}
            >
              Reset
            </StopWatchButton>
          </>
        )}
      </div>

      <div className="overflow-scroll row-span-8">
        <table className="w-full overflow-scroll table-fixed ">
          <thead>
            <tr className="w-full border-b text-neutral-600 border-neutral-600 ">
              <th className="font-normal text-left">Lap #</th>
              <th className="font-normal text-right">Time</th>
            </tr>
          </thead>
          <tbody className="flex-1 min-h-0 overflow-scroll leading-10">
            {(state.active || state.currentLapTime > 0) && (
              <tr className="">
                <td className="text-left">Lap {state.lapTimes.length + 1}</td>
                <td className="text-right" ref={activeLapRef}></td>
              </tr>
            )}
            {state.lapTimes
              .map((lapTime, index) => (
                <tr className="w-full border-t border-neutral-700" key={index}>
                  <td className="text-left">Lap {index + 1}</td>
                  <td className="text-right">{formatTime(lapTime)}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// put this in a seperate file
function formatTime(timeElapsed: number) {
  const milis: string = Math.floor((timeElapsed / 10) % 100)
    .toString()
    .padStart(2, "0");
  const seconds: string = (Math.floor(timeElapsed / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const mins: string = Math.floor(timeElapsed / (60 * 1000))
    .toString()
    .padStart(2, "0");
  return `${mins}:${seconds}.${milis}`;
}
