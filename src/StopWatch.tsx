import React from 'react'

interface StopWatchProps {
    hours: number,
    minutes: number,
    seconds: number,
    milliseconds: number
}

export default function StopWatch({ hours, minutes, seconds, milliseconds }: StopWatchProps) {
    
    return(
        <h1 data-testid="stop-watch">{hours}:{minutes}:{seconds}.<span className='milli'>{milliseconds}</span></h1>
    )
}