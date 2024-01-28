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
      <div className=" min-w-36 ">{index ? `${index}` : "Current"}</div>
      <div className="flex justify-center text-xl py-5 -space-x-1 ">
        <div className=" min-w-14">{`${relativeLapTimeBreakdown.minutes}`}</div>
        <div>:</div>
        <div className=" min-w-14">{`${relativeLapTimeBreakdown.seconds}`}</div>
        <div>.</div>
        <div className="min-w-14">
          {`${relativeLapTimeBreakdown.milliseconds.slice(0, 2)}`}
        </div>
      </div>
      <div className="flex justify-center text-xl py-5 -space-x-1 ">
        <div className=" min-w-14">{`${totalLapTimeBreakdown.minutes}`}</div>
        <div>:</div>
        <div className=" min-w-14">{`${totalLapTimeBreakdown.seconds}`}</div>
        <div>.</div>
        <div className="min-w-14">
          {`${totalLapTimeBreakdown.milliseconds.slice(0, 2)}`}
        </div>
      </div>
    </div>
  );
};

export default Lap;
