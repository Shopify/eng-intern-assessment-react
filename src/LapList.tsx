import React from "react";
import { formatTime } from "./utils/formatTime";

interface LapListProps {
   laps: number[];
}

export default function LapList({ laps }: LapListProps) {
   return (
      <div>
         {laps.map((lap, index) => (
            <div key={index}>
               <span>Lap {index + 1}: </span>
               <span>{formatTime(lap)}</span>
            </div>
         ))}
      </div>
   );
}
