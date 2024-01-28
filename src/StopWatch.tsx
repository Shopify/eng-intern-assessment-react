import React from 'react'

interface stopWatchProps {
    time: string
}

const StopWatch = ({time} : stopWatchProps) => {
    return(
        <p className='timeDisplay digital'>{time}</p>
    )
}

export default StopWatch;