import React, { useEffect } from "react";

import { calculateTime } from "./StopWatchUtils";
import { StopWatchProps } from "./stopWatchProps";

export default function StopWatch(props: StopWatchProps) {
  const { isStopped, time, setTime } = props;

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!isStopped) {
      // increment timer value every 10 milliseconds
      intervalId = setInterval(() => setTime((prev: number) => prev + 10), 10);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isStopped]);

  return (
    <div className="stop-watch">
      <span>{calculateTime(time)}</span>
    </div>
  );
}
