import React from 'react';
import { formatTime } from './utils';

interface StopWatchProps {
  time: number;
  className?: string;
}

export default function StopWatch(props: StopWatchProps) {
  return <div className={props.className}>{formatTime(props.time)}</div>;
}
