import React from 'react'

interface stopWatchProps {
    time: string
}

const StopWatch = ({time} : stopWatchProps) => {
    return(
        <div className='timeDisplay'>{time}</div>
    )
}

export default StopWatch;