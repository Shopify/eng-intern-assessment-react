import React, { useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { useState } from 'react'

export default function App() {
    const [time, setTime] = useState<number>(0)
    const [stopWatchOn, setStopWatchOn] = useState<boolean>(false)

    useEffect(() => {
        let interval: NodeJS.Timeout
    
        if (stopWatchOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10) // adds 10 ms to time every 10 ms
        } else {
          clearInterval(interval);
        }
        
        return () => clearInterval(interval)

    }, [stopWatchOn]);

    return(
        <div>
            <StopWatch time={time}></StopWatch>
            <StopWatchButton label={"start"} color={""} onButtonClick={() => setStopWatchOn(true)}></StopWatchButton>
            <StopWatchButton label={"stop"} color={""} onButtonClick={() => setStopWatchOn(false)}></StopWatchButton>
            <StopWatchButton label={"restart"} color={""} onButtonClick={() => setTime(0)}></StopWatchButton>
        </div>
    )
}
