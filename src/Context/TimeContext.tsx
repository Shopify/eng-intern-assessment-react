import React from "react";

export type timeContextType = {
  time: number;
  setTime: (value: React.SetStateAction<number>) => void;
};

const TimeContext = React.createContext<timeContextType>({} as timeContextType);

export default TimeContext;
