import React, { useEffect, useState } from 'react'

import {formatTime} from './StopWatch'

interface StopWatchLapListProps {
    laps: number[]
  }

export default function StopWatchLapList({laps}:StopWatchLapListProps) { 
    return <div data-testid='lap-list'> 
        {laps && laps.map((lap, index) => { 
            return <div key={index}>{(`Lap ${index+1} ${formatTime(lap)}`)} </div>
        }) }
    </div>
}