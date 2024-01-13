import React from "react";

import { formatTime, formattedTimeToString } from "../../lib/formatting/time";

type StopwatchTimeProps = {
  elapsedTime: number;
};

function StopWatchTime({ elapsedTime }: StopwatchTimeProps) {
  const formattedTime = React.useMemo(() => {
    return formattedTimeToString(formatTime(elapsedTime));
  }, [elapsedTime]);

  return <div className='stopwatch-time'>{formattedTime}</div>;
}

export default StopWatchTime;
export type { StopwatchTimeProps };
