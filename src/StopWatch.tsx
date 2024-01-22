import React from 'react'

interface StopWatchProps {
    time: number;
    Time: (seconds: number) => string;
  }

export default function StopWatch({ time, Time }: StopWatchProps) {
    return(
        <div>{Time(time)}</div>
    )
}