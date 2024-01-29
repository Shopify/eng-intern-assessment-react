import React, { createContext, useContext } from "react";
import { useStopWatch } from "./useStopWatch";

const StopwatchContext = createContext(null);

export const StopwatchProvider = ({ children }: any) => {
  const stopwatch = useStopWatch();
  return (
    <StopwatchContext.Provider value={stopwatch}>
      {children}
    </StopwatchContext.Provider>
  );
};

export const useStopWatchContext = () => useContext(StopwatchContext);
