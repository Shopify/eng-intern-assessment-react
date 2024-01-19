/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "./utils/colors";

import React, { useState } from "react";
import Stopwatch from "./StopWatch";
import StopwatchButton from "./StopWatchButton";
import LapList from "./LapList";

const mainStyle = css({
   display: "flex",
   flexDirection: "column",
   justifyContent: "start",
   alignItems: "center",
   backgroundColor: colors.primary_bg,
   minHeight: "100dvh",
   color: colors.text,
});

const stopWatchStyle = css({
   marginTop: "5rem",
});

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
      <div className="App" css={mainStyle}>
         <div css={stopWatchStyle}>
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
         </div>
         <LapList laps={laps} />
      </div>
   );
}
