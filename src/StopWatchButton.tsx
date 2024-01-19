/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "./utils/colors";

import React from "react";

const stopwatchButtonStyle = css({
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
});

interface StopwatchButtonProps {
   isActive: boolean;
   isPaused: boolean;
   handleStart: () => void;
   handleStop: () => void;
   handleReset: () => void;
   handleLap: () => void;
}

export default function StopWatchButton({
   isActive,
   isPaused,
   handleStart,
   handleStop,
   handleReset,
   handleLap,
}: StopwatchButtonProps) {
   return (
      <div css={stopwatchButtonStyle}>
         {!isActive && !isPaused ? (
            <button type="button" className="btn btn-success btn-lg mx-2" onClick={handleStart}>
               Start
            </button>
         ) : isPaused ? (
            <button type="button" className="btn btn-success btn-lg mx-2" onClick={handleStart}>
               Resume
            </button>
         ) : (
            <button type="button" className="btn btn-danger btn-lg mx-2" onClick={handleStop}>
               Stop
            </button>
         )}
         <button
            type="button"
            className="btn btn-primary btn-lg mx-2"
            onClick={handleReset}
            disabled={!isActive && !isPaused}
         >
            Reset
         </button>
         {isActive && (
            <button type="button" className="btn btn-secondary btn-lg mx-2" onClick={handleLap}>
               Lap
            </button>
         )}
      </div>
   );
}
