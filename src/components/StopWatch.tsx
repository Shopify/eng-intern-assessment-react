import React from 'react'
import formatTime from '../utils/formatTime'

interface stopWatchProps {
    time: number
}

const StopWatch = ({time} : stopWatchProps) => {
    return(
        <p className='timeDisplay digital'>{formatTime(time)}</p>
    )
}

export default StopWatch;