import React from 'react'

interface stopWatchProps {
    time: number;
}

const StopWatch = ({time} : stopWatchProps) => {
    return(
        <div>{time}</div>
    )
}

export default StopWatch;