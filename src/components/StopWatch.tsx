import React from "react";
import { getTimeComponentsFromMs } from "../utils/timeConversion";

//Component to display the timer
export default function StopWatch({ time }: { time: number }) {
  return (
    <div data-testid="stopwatch-time">
      {getTimeComponentsFromMs(time).map((comp, index, array) => (
        <React.Fragment key={index}>
          <span>{comp}</span>
          {index !== array.length - 1 && ":"}
        </React.Fragment>
      ))}
    </div>
  );
}
