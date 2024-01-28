import React from 'react'
import StopWatchButton from './StopWatchButton'

type StopWatchProps = {
    time: number
}

export default function StopWatch({ time }: StopWatchProps) {
    return(
        <div>
            {time}
        </div>
    )
}