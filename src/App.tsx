import React from "react";
import { useState } from "react";
import StopWatch from "./StopWatch";
// Context
import RunningContext from "./Context/RunningContext";
import TimeContext from "./Context/TimeContext";
import LapContext from "./Context/LapContext";

export default function App() {
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  const changeRunning = () => {
    setRunning(running ? false : true);
  };

  const addLap = (time: number) => {
    setLapTimes((prevTimes) => [...prevTimes, time]);
  };

  const clearLap = () => {
    setLapTimes([]);
  };

  return (
    <RunningContext.Provider value={{ running, changeRunning }}>
      <TimeContext.Provider value={{ time, setTime }}>
        <LapContext.Provider value={{ lapTimes, addLap, clearLap }}>
          <StopWatch />
        </LapContext.Provider>
      </TimeContext.Provider>
    </RunningContext.Provider>
  );
}
