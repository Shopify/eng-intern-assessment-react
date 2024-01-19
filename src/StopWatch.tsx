import React, { useEffect } from "react";
import { formatTime } from "./utils/formatTime";

interface StopwatchProps {
   isActive: boolean;
   isReset: boolean;
   time: number;
   setTime: (time: number) => void;
   handleReset: () => void;
}

export default function StopWatch({
   isActive,
   isReset,
   time,
   setTime,
   handleReset,
}: StopwatchProps) {
   useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isActive) {
         interval = setInterval(() => {
            setTime(time + 10);
         }, 10);
      } else if (!isActive && time !== 0) {
         clearInterval(interval);
      }

      if (isReset) {
         setTime(0);
         handleReset();
      }

      return () => clearInterval(interval);
   }, [isActive, isReset, setTime, handleReset, time]);

   return (
      <div>
         <p>{formatTime(time)}</p>
      </div>
   );
}
