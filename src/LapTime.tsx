import React from "react";

import { getTimeBreakdown } from "./utils";

interface LapTimeProps {
  lapTime: number;
  index: number;
}

const LapTime: React.FC<LapTimeProps> = ({ lapTime, index }) => {
  const timeBreakdown = getTimeBreakdown(lapTime);
  return (
    <div className="flex justify-between text-4xl">
      <div>{`Lap ${index}`}</div>
      <div>
        {`${timeBreakdown.minutes}:${timeBreakdown.seconds}.${timeBreakdown.centiseconds}`}
      </div>
    </div>
  );
};

export default LapTime;
