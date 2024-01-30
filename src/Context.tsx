import React, { createContext, useContext } from "react";
import { useStopWatch } from "./useStopWatch";

const StopwatchContext = createContext(null);

// global context so that the timer functions can be used in all components

export const StopwatchProvider = ({ children }: any) => {
  const stopwatch = useStopWatch();
  return (
    <StopwatchContext.Provider value={stopwatch}>
      {children}
    </StopwatchContext.Provider>
  );
};

export const useStopWatchContext = () => useContext(StopwatchContext);
