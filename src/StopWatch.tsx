import React from 'react';
import { formatTime } from './utils';

interface StopWatchProps {
  time: number;
}

export default function StopWatch(props: StopWatchProps) {
  return <div>{formatTime(props.time)}</div>;
}
