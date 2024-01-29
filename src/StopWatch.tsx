import React from 'react'

interface StopWatchProps {
    time: number;
    displayTime: (seconds: number) => string;
  }

export default function StopWatch({ time, displayTime }: StopWatchProps) {
    return(
        <div>{displayTime(time)}</div>
    )
}