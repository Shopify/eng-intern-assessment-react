import React, { useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { useState } from 'react'
import "./styles.css"

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

    }, [stopWatchOn])

    return(
        <div className='container'>
            <StopWatch time={time}/>
            <div className='buttons'>
                {stopWatchOn? (
                    <StopWatchButton label={"STOP"} color={"red"} onButtonClick={() => setStopWatchOn(false)}/>
                ) : (
                    <StopWatchButton label={"START"} color={"green"} onButtonClick={() => setStopWatchOn(true)}/>
                )}
                <StopWatchButton label={"RESTART"} color={"blue"} onButtonClick={() => setTime(0)}/>
            </div>
        </div>
    )
}
