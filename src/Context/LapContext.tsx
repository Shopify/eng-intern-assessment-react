import React from "react";

export type lapContextType = {
  lapTimes: number[];
  addLap: (Lap: number) => void;
  clearLap: () => void;
};

const LapContext = React.createContext<lapContextType>({} as lapContextType);

export default LapContext;
