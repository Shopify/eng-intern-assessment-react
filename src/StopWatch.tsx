import React from "react";

/**
 * A component that gets and displays the current time
 */

interface StopWatchProps {
  time: number;
  format: (time: number) => string;
}

export default function StopWatch({ time, format }: StopWatchProps) {
  return (
    <div>
      <h3 data-testid="time">{format(time)}</h3>
    </div>
  );
}
