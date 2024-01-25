import React from "react";

/**
 * This represents the stopwatch display
 */
export default function StopWatch({ children }: StopWatchProps) {
  return <div className="p-5 text-center font-mono text-8xl">{children}</div>;
}

type StopWatchProps = {
  children: React.ReactNode;
};
