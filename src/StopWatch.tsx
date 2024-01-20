import React from 'react'
import { formatTime } from './util'

// Represents the stopwatch display
export default function DisplayComponent({time}: {time: number}) {
    return(
    <div>
        <h1 className="time">{formatTime(time)}</h1>
    </div>
    )
}