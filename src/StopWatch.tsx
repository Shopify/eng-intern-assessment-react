import React from "react";
import { initialState, stopWatchReducer } from "./lib/stopwatch";
import StopWatchButton from "./StopWatchButton";
import { formatTime } from "./lib/util";

export default function StopWatch() {
  // stopwatch state machine
  const [state, dispatch] = React.useReducer(stopWatchReducer, initialState);

  const timerRef = React.useRef<HTMLDivElement>(null);
  const activeLapRef = React.useRef<HTMLTableCellElement>(null);

  // we use this ref to store the animation frame id
  // this is a great way to cancel the animation frame
  // when needed, but also to avoid re-rendering the component
  // on each animation frame
  const animRef = React.useRef<number>(null);

  // memoized values, these are useful to live update the UI
  const prevLapTimes = React.useMemo(
    () => state.lapDurations.reduce((a, b) => a + b, 0),
    [state.lapDurations]
  );

  const showLiveTime = React.useCallback(() => {
    // the current lap time, in milliseconds
    const lapTime =
      state.currentLapElapsedTime +
      (state.active ? performance.now() - state.currentLapStartTime : 0);

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

  React.useEffect(() => {
    animRef.current = requestAnimationFrame(showLiveTime);

    // cleanup the animation frame based on the ref
    return () => cancelAnimationFrame(animRef.current);
  }, [showLiveTime]);

  return (
    <div className="grid w-full h-full max-w-lg gap-8 m-auto grid-rows-12">
      <div
        className="flex items-center justify-center row-span-2 text-6xl font-bold"
        ref={timerRef}
      >
        {formatTime(prevLapTimes + state.currentLapElapsedTime)}
      </div>

      {/* buttons */}
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
              className="flex-1 bg-red-500 border-red-600 hover:bg-red-600 hover:border-red-700"
              onClick={() => dispatch("reset")}
            >
              Reset
            </StopWatchButton>
          </>
        )}
      </div>

      {/* a scrollable table to show laps */}
      <div className="overflow-scroll row-span-8">
        <table className="w-full overflow-y-scroll table-fixed ">
          <thead>
            <tr className="w-full border-b text-neutral-600 border-neutral-600 ">
              <th className="font-normal text-left">Lap #</th>
              <th className="font-normal text-right">Time</th>
            </tr>
          </thead>
          <tbody className="flex-1 min-h-0 overflow-scroll leading-10">
            {(state.active || state.currentLapElapsedTime > 0) && (
              <tr className="">
                <td className="text-left">
                  Lap {state.lapDurations.length + 1}
                </td>
                <td className="text-right" ref={activeLapRef}>
                  {formatTime(state.currentLapElapsedTime)}
                </td>
              </tr>
            )}
            {state.lapDurations
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
