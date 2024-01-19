// component that represents the stopwatch display
import React from "react";

import { convertToDisplayTime } from "./utils/timeDisplayUtils";

interface Props {
  timeElapsed: number;
}

export default function StopWatch({ timeElapsed }: Props) {
  return (
    <div>
      <h1>{convertToDisplayTime(timeElapsed)}</h1>
    </div>
  );
}
