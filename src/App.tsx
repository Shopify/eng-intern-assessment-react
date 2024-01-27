import React from "react";

import { reducer, initialState } from "./lib/stopwatchState";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div>
      <StopWatch state={state} />
      <h2 className="">Buttons</h2>

      {/* Only show necessary buttons depending on state */}
      {state.active ? (
        <>
          <StopWatchButton onClick={() => dispatch("stop")}>
            Stop
          </StopWatchButton>
          <StopWatchButton onClick={() => dispatch("lap")}>Lap</StopWatchButton>
        </>
      ) : (
        <>
          <StopWatchButton onClick={() => dispatch("start")}>
            Start
          </StopWatchButton>
          <StopWatchButton onClick={() => dispatch("reset")}>
            Reset
          </StopWatchButton>
        </>
      )}
    </div>
  );
}
