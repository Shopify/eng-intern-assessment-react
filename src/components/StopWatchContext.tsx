import React, { createContext, useContext, useState } from "react";

type LapRecord = {
  time: number;
  distance: number;
};

type StopWatchContextType = {
  laps: LapRecord[];
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  distance: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  currentLap: number;
  setCurrentLap: React.Dispatch<React.SetStateAction<number>>;
  workout: number;
  setWorkout: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  addLap: (lap: LapRecord) => void;
  formatTime: (time: number) => string;
  formatDistance: (distance: number) => string;
};

const StopWatchContext = createContext<StopWatchContextType | undefined>(
  undefined
);

export const useStopWatch = () => {
  const context = useContext(StopWatchContext);
  if (!context) {
    throw new Error("useStopWatch must be used within a StopWatchProvider");
  }
  return context;
};

export const StopWatchProvider: React.FC = ({ children }) => {
  const [laps, setLaps] = useState<LapRecord[]>([]);
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [currentLap, setCurrentLap] = useState<number>(0);
  const [workout, setWorkout] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const addLap = (lap: LapRecord) => {
    setLaps((prevLaps) => [...prevLaps, lap]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = (time % 1000).toString().padStart(3, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(2)} m`;
  };

  return (
    <StopWatchContext.Provider
      value={{
        laps,
        time,
        setTime,
        distance,
        setDistance,
        currentLap,
        setCurrentLap,
        workout,
        setWorkout,
        isRunning,
        setIsRunning,
        addLap,
        formatTime,
        formatDistance,
      }}
    >
      {children}
    </StopWatchContext.Provider>
  );
};
