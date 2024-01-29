import React from "react";

import { getTimeBreakdown } from "../utils";

interface LapProps {
  totalLapTime: number;
  relativeLapTime: number;
  index?: number;
}

interface LapTimeProps {
  time: { minutes: string; seconds: string; milliseconds: string };
}

const LapTime: React.FC<LapTimeProps> = ({ time }) => {
  return (
    <>
      <div
        className=" min-w-14"
        data-testid="lap-minutes"
      >{`${time.minutes}`}</div>
      <div>:</div>
      <div
        className=" min-w-14"
        data-testid="lap-seconds"
      >{`${time.seconds}`}</div>
      <div>.</div>
      <div
        className="min-w-14"
        data-testid="lap-ms"
      >{`${time.milliseconds.slice(0, 2)}`}</div>
    </>
  );
};

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
        <LapTime time={relativeLapTimeBreakdown} />
      </div>
      <div className="flex justify-center text-xl py-5 -space-x-1 min-w-48">
        <LapTime time={totalLapTimeBreakdown} />
      </div>
    </div>
  );
};

export default Lap;
