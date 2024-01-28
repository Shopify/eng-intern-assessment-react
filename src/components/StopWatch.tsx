import React from "react";
import { getTimeComponentsFromMs } from "../utils/timeConversion";

export default function StopWatch({ time }: { time: number }) {
  return (
    <div>
      {getTimeComponentsFromMs(time).map((comp, index, array) => (
        <React.Fragment key={index}>
          <span>{comp}</span>
          {index !== array.length - 1 && ":"}
        </React.Fragment>
      ))}
    </div>
  );
}
