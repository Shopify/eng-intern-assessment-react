import React from "react";
import { formattedTime } from "./utils";

type StopWatchProps = {
  timeInTenMillis: number;
};

export default function StopWatch({ timeInTenMillis }: StopWatchProps) {
  return (
    <div>
      <p className="stopwatch-display">{formattedTime(timeInTenMillis)}</p>
    </div>
  );
}
