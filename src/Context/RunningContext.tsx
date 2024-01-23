import React from "react";

export type runContextType = {
  running: boolean;
  changeRunning: () => void;
};

const RunningContext = React.createContext<runContextType>(
  {} as runContextType
);

export default RunningContext;
