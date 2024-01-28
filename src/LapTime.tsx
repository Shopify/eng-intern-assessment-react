import React from "react";

import { getTimeBreakdown } from "./utils";

interface LapTimeProps {
  lapTime: number;
}

const LapTime: React.FC<LapTimeProps> = ({ lapTime }) => {
  const timeBreakdown = getTimeBreakdown(lapTime);
  return (
    <div>
      {`${timeBreakdown.minutes}:${timeBreakdown.seconds}.${timeBreakdown.centiseconds}`}
    </div>
  );
};

export default LapTime;
