import React, { useState } from "react";
import Stopwatch from "./StopWatch";
import StopwatchButton from "./StopWatchButton";
import LapList from "./LapList";

export default function App() {
   const [isActive, setIsActive] = useState<boolean>(false);
   const [isPaused, setIsPaused] = useState<boolean>(false);
   const [isReset, setIsReset] = useState<boolean>(false);
   const [time, setTime] = useState<number>(0);
   const [laps, setLaps] = useState<number[]>([]);

   const handleStart = () => {
      setIsActive(true);
      setIsPaused(false);
   };

   const handleStop = () => {
      setIsActive(false);
      setIsPaused(true);
   };

   const handleReset = () => {
      setIsActive(false);
      setIsPaused(false);
      setIsReset(true);
      setTime(0);
      setLaps([]);
   };

   const handleLap = () => {
      setLaps([...laps, time]);
   };

   return (
      <div className="App">
         <header className="App-header">
            <Stopwatch
               isActive={isActive}
               isReset={isReset}
               time={time}
               setTime={setTime}
               handleReset={() => setIsReset(false)}
            />
            <StopwatchButton
               isActive={isActive}
               isPaused={isPaused}
               handleStart={handleStart}
               handleStop={handleStop}
               handleReset={handleReset}
               handleLap={handleLap}
            />
            <LapList laps={laps} />
         </header>
      </div>
   );
}
