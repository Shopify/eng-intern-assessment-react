import React from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const [time, setTime] = React.useState<number>(0)
    const [lapNum, setLapNum] = React.useState<number>(0)
    const [counting, setCounting] = React.useState<boolean>(false)

    return(
        <div>
            <StopWatchButton setCounting/>
        </div>
    )
}