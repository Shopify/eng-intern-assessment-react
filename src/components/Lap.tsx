import React from "react";

import { getTimeBreakdown } from "../utils";

interface LapProps {
  totalLapTime: number;
  relativeLapTime: number;
  index?: number;
}

const Lap: React.FC<LapProps> = ({
  totalLapTime: totalLapTime,
  relativeLapTime,
  index,
}) => {
  const totalLapTimeBreakdown = getTimeBreakdown(totalLapTime);
  const relativeLapTimeBreakdown = getTimeBreakdown(relativeLapTime);
  return (
    <div className="flex justify-between text-xl items-center">
      <div className=" min-w-48 ">{index ? `${index}` : "Current"}</div>
      <div className="flex justify-center text-xl py-5 -space-x-1 min-w-48">
        <div
          className=" min-w-14"
          data-testid={`rel-lap-${index}-minutes`}
        >{`${relativeLapTimeBreakdown.minutes}`}</div>
        <div>:</div>
        <div
          className=" min-w-14"
          data-testid={`rel-lap-${index}-seconds`}
        >{`${relativeLapTimeBreakdown.seconds}`}</div>
        <div>.</div>
        <div className="min-w-14" data-testid={`rel-lap-${index}-ms`}>
          {`${relativeLapTimeBreakdown.milliseconds.slice(0, 2)}`}
        </div>
      </div>
      <div className="flex justify-center text-xl py-5 -space-x-1 min-w-48">
        <div
          className=" min-w-14"
          data-testid={`abs-lap-${index}-minutes`}
        >{`${totalLapTimeBreakdown.minutes}`}</div>
        <div>:</div>
        <div
          className=" min-w-14"
          data-testid={`abs-lap-${index}-seconds`}
        >{`${totalLapTimeBreakdown.seconds}`}</div>
        <div>.</div>
        <div className="min-w-14" data-testid={`abs-lap-${index}-ms`}>
          {`${totalLapTimeBreakdown.milliseconds.slice(0, 2)}`}
        </div>
      </div>
    </div>
  );
};

export default Lap;
