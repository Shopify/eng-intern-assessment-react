import React from "react";

interface StopWatchProps {
  time: number;
}

export default function StopWatch({ time }: StopWatchProps) {
  return <div>{time}</div>;
}
