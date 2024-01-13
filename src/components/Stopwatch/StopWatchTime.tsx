import React from "react";

import { formatTime } from "../../lib/formatting/time";

type StopwatchTimeProps = {
  elapsedTime: number;
};

function StopWatchTime({ elapsedTime }: StopwatchTimeProps) {
  const formattedTime = React.useMemo(() => {
    return formatTime(elapsedTime);
  }, [elapsedTime]);

  return <span>{`${formattedTime.hours}:${formattedTime.minutes}:${formattedTime.seconds}:${formattedTime.milliseconds}`}</span>;
}

export default StopWatchTime;
export type { StopwatchTimeProps };
