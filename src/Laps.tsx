import React from "react";
import { formattedTime } from "./utils";

type LapsProps = {
  lapTimes: number[];
};

export default function Laps({ lapTimes }: LapsProps) {
  return (
    <div className="laps-display">
      {lapTimes.map((lapTime, index) => (
        <div className="lap-row" key={index}>
          <span className="lap-title">{`Lap ${index + 1}`}</span>
          <span className="lap-time">{formattedTime(lapTime)}</span>
        </div>
      ))}
    </div>
  );
}
