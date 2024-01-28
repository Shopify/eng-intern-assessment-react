import React from "react";

import { getTimeBreakdown } from "./utils";

interface LapTimeProps {
  lapTime: number;
  index?: number;
}

const LapTime: React.FC<LapTimeProps> = ({ lapTime, index }) => {
  const timeBreakdown = getTimeBreakdown(lapTime);
  return (
    <div className="flex justify-between text-4xl items-center">
      <div>{index ? `Lap ${index}` : "Current Lap"}</div>
      {}
      <div className="flex justify-center text-4xl py-5 -space-x-1">
        <div className=" min-w-14">{`${timeBreakdown.minutes}`}</div>
        <div>:</div>
        <div className=" min-w-14">{`${timeBreakdown.seconds}`}</div>
        <div>.</div>
        <div className="min-w-14">{`${timeBreakdown.milliseconds.slice(
          0,
          2
        )}`}</div>
      </div>
    </div>
  );
};

export default LapTime;
