import React from 'react'
import { StopWatchLapProps } from '../props/StopWatchLap'

/**
 * Note: this component was created for modularity
 * and future extension purposes. For example,
 * if a lap represented the time to lap a track,
 * this component can be reused by displaying
 * information (i.e. heart rate) using
 * the details property.
 * */


export const StopWatchLap = (
    {
        time,
        displayTime,
        details
    }: StopWatchLapProps) => {

  return (
    <div>
        <h2>{displayTime}</h2>
        <div>
            {details}
        </div>
    </div>
  )
}

