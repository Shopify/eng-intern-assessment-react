import React from "react";
import { format } from "date-fns";

interface LapsProps {
  //   time: number;
  laps: number[];
  min: number;
  max: number;
}

export default function Laps({ laps, min, max }: LapsProps) {
  return (
    <div>
      {laps.map((t, index) => (
        <li key={index}
        style={{
            color: index === min ? 'green' : index === max ? 'red' : 'black',
          }}>
          {t < 3600000
            ? format(new Date(t), "mm:ss.SS")
            : format(new Date(t), "hh:mm:ss.SS")}
        </li>
      ))}
    </div>
  );
}
