import { useContext, createContext } from "react";

interface IStopWatchContext {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  laps: Array<number>;
  setLaps: React.Dispatch<React.SetStateAction<Array<number>>>;
}

export const StopWatchContext = createContext<IStopWatchContext>({
  time: 0,
  setTime: () => {},
  isRunning: false,
  setIsRunning: () => {},
  laps: [],
  setLaps: () => {},
});

// Custom hook to use the StopWatchContext
export const useStopWatchContext = () => useContext(StopWatchContext);
