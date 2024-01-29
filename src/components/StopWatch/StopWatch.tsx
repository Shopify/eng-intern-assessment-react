import React, { useCallback, useEffect, useRef } from "react";
import "./StopWatch.css";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import { getFormattedTime, getFormattedTimeObject } from "../../utils/time-formatter";

export default function StopWatch() {
   const [time, setTime] = React.useState(0);
   const [isRunning, setIsRunning] = React.useState(false);
   const [laps, setLaps] = React.useState([]);

   const { hours, minutes, seconds, milliseconds } = getFormattedTimeObject(time);

   const lapsRef = useRef(null);

   const resetTimer = useCallback(() => {
      setTime(0);
      setIsRunning(false);
      setLaps([]);
   }, []);

   const startTimer = useCallback(() => {
      setIsRunning(true);
   }, []);

   const stopTimer = useCallback(() => {
      setIsRunning(false);
   }, []);

   const addLap = useCallback(() => {
      setLaps((prevLaps) => {
         const lapTime = time - prevLaps.reduce((acc, curr) => acc + curr.lapTime, 0);
         const overallTime = time;
         return [...prevLaps, { lapTime, overallTime }];
      });
   }, [time]);

   useEffect(() => {
      if (lapsRef.current) {
         const { scrollHeight, clientHeight } = lapsRef.current;
         lapsRef.current.scrollTop = scrollHeight - clientHeight;
      }
   }, [laps]);

   useEffect(() => {
      let interval: ReturnType<typeof setInterval> | null = null;
      if (isRunning) {
         interval = setInterval(() => setTime((time) => time + 1), 10);
      }
      return () => {
         clearInterval(interval);
      };
   }, [isRunning]);

   return (
      <div className="stopwatch">
         <div className="time">
            {hours !== "00" && (
               <>
                  <p className="numbers hours">{hours}</p>
                  <p>:</p>
               </>
            )}
            <p className="number minutes">{minutes}</p>
            <p>:</p>
            <p className="number seconds">{seconds}</p>
            <p>.</p>
            <p className="number milliseconds">{milliseconds}</p>
         </div>
         <div className="buttons">
            <StopWatchButton type="start" onClick={startTimer} isRunning={isRunning} />
            <StopWatchButton type="stop" onClick={stopTimer} isRunning={isRunning} />
            <StopWatchButton type="lap" onClick={addLap} isRunning={isRunning} />
            <StopWatchButton type="reset" onClick={resetTimer} isRunning={isRunning} />
         </div>
         {laps.length > 0 && <div className="laps-container">
            <div className="columns">
               <div>Lap</div>
               <div>Lap Times</div>
               <div>Overall Time</div>
            </div>
            <ul className="laps" ref={lapsRef}>
               {laps.map((lap, index) => {
                  const formattedLapTime = getFormattedTime(lap.lapTime);
                  const formattedOverallTime = getFormattedTime(lap.overallTime);
                  return (
                     <li className="lap-item" key={`${index}${lap}`}>
                        <div>{index + 1}</div>
                        <div>{formattedLapTime}</div>
                        <div>{formattedOverallTime}</div>
                     </li>
                  );
               })}
            </ul>
         </div>}
      </div>
   );
}
