import React, { useCallback } from "react";
import "./StopWatch.css";
import StopWatchButton from "../StopWatchButton/StopWatchButton";

export default function StopWatch() {


   return (
      <div className="stopwatch">
         <div className="time">
            <p className="hour">00</p>
            <p>:</p>
            <p className="seconds">00</p>
            <p>.</p>
            <p className="milliseconds">00</p>
         </div>
         <div className="buttons">
            <StopWatchButton type="start" onClick={null} />
            <StopWatchButton type="stop" onClick={null} />
            <StopWatchButton type="lap" onClick={null} />
            <StopWatchButton type="reset" onClick={null} />
         </div>
      </div>
   );
}
