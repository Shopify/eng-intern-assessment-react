import React, { useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'


export default function App() {
    const [isRunning, setIsStopwatchRunning] = useState(false)
    const [time, setTime] = useState(0)

    return(
        <div>
            <StopWatch time={time}/>
            {/* <StopWatchButton /> */}
        </div>
    )
}