import React, { createContext, useContext, useState } from "react";

// structure of a lap record to include time (ms) and distance (m)
type LapRecord = {
  time: number;
  distance: number;
};

// // context type definition for all the functionalities and states of the stopwatch
type StopWatchContextType = {
  laps: LapRecord[]; // array of lap records
  time: number; // current time in ms
  setTime: React.Dispatch<React.SetStateAction<number>>; // function to set current time
  distance: number; // current distance in m
  setDistance: React.Dispatch<React.SetStateAction<number>>; // function to set current distance
  currentLap: number; // current lap time in ms
  setCurrentLap: React.Dispatch<React.SetStateAction<number>>; // function to set current lap time
  workout: number; // current workout level
  setWorkout: React.Dispatch<React.SetStateAction<number>>; // function to set current workout level
  isRunning: boolean; // current running state (running=T or standing=F)
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>; // function to set current running state
  addLap: (lap: LapRecord) => void; // function to add a lap record to the array
  formatTime: (time: number) => string; // function to format time in ms to mm:ss:ms
  formatDistance: (distance: number) => string; // function to format distance for display
};

// create a react context for the stopwatch, initially undefined
const StopWatchContext = createContext<StopWatchContextType | undefined>(
  undefined
);

// custom hoook to access the stopwatch context, throws error if used outside of the provider
export const useStopWatch = () => {
  const context = useContext(StopWatchContext);
  if (!context) {
    throw new Error("useStopWatch must be used within a StopWatchProvider");
  }
  return context;
};

// provider component to wrap the app and provide the stopwatch context
export const StopWatchProvider: React.FC = ({ children }) => {
  // state hooks for the stopwatch context
  const [laps, setLaps] = useState<LapRecord[]>([]);
  const [time, setTime] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [currentLap, setCurrentLap] = useState<number>(0);
  const [workout, setWorkout] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // function to add new lap record and append to lap array
  const addLap = (lap: LapRecord) => {
    setLaps((prevLaps) => [...prevLaps, lap]);
  };

  // function for formatting time and distance to display components
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

  // proivder component wraps children with the context, making state and functions available to all children
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
