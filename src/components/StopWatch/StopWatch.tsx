import React, { useCallback, useEffect, useRef } from "react";
import "./StopWatch.css";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import { getFormattedTime } from "../../utils/time-formatter";

// StopWatch Component: Implements a stopwatch with start, stop, lap, and reset functionalities.
export default function StopWatch() {
   // State hooks for tracking time, running status, and lap times
   const [time, setTime] = React.useState(0);
   const [isRunning, setIsRunning] = React.useState(false);
   const [laps, setLaps] = React.useState([]);

   // Ref for the laps list element to enable automatic scrolling to the newest lap
   const lapsRef = useRef(null);

   // Resets the stopwatch to initial state
   const resetTimer = useCallback(() => {
      setTime(0);
      setIsRunning(false);
      setLaps([]);
   }, []);

   // Starts the stopwatch
   const startTimer = useCallback(() => {
      setIsRunning(true);
   }, []);

   // Stops the stopwatch
   const stopTimer = useCallback(() => {
      setIsRunning(false);
   }, []);

   // Adds a new lap with current time and overall time
   const addLap = useCallback(() => {
      setLaps((prevLaps) => {
         const lapTime = time - prevLaps.reduce((acc, curr) => acc + curr.lapTime, 0);
         const overallTime = time;
         return [...prevLaps, { lapTime, overallTime }];
      });
   }, [time]);

   // Auto-scrolls to the bottom of the laps list whenever a new lap is added
   useEffect(() => {
      if (lapsRef.current) {
         const { scrollHeight, clientHeight } = lapsRef.current;
         lapsRef.current.scrollTop = scrollHeight - clientHeight;
      }
   }, [laps]);

   // Updates the stopwatch time every 10 milliseconds when the stopwatch is running
   useEffect(() => {
      let interval: ReturnType<typeof setInterval> | null = null;
      if (isRunning) {
         interval = setInterval(() => setTime((time) => time + 1), 10);
      }
      return () => {
         clearInterval(interval); // clears the interval during unmounting and when timerOn changes
      };
   }, [isRunning]);

   return (
      <div className="stopwatch">
         <div className="time">
            <p>{getFormattedTime(time)}</p>
         </div>
         {/* Control buttons for the stopwatch */}
         <div className="buttons">
            <StopWatchButton type="start" onClick={startTimer} isRunning={isRunning} />
            <StopWatchButton type="stop" onClick={stopTimer} isRunning={isRunning} />
            <StopWatchButton type="lap" onClick={addLap} isRunning={isRunning} />
            <StopWatchButton type="reset" onClick={resetTimer} isRunning={isRunning} />
         </div>
         {/* Display laps if any */}
         {laps.length > 0 && (
            <div data-testid="laps-container" className="laps-container">
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
            </div>
         )}
      </div>
   );
}
