import React, { useEffect, useState } from 'react'

import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    let intervalID: ReturnType<typeof setInterval>;

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [counting, setCounting] = useState(false);
    
    useEffect(() => {
        if (counting) {
            intervalID = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000)
        } else {
            clearInterval(intervalID);
        }

        return () => {
            clearInterval(intervalID);
        }
    }, [counting])

    return(
        <div>
            <StopWatch hours={hours} minutes={minutes} seconds={seconds}/>
            <StopWatchButton text="Start" handleClick={() => {
                setCounting(true);
            }}/>
            <StopWatchButton text="Stop" handleClick={() => {
                setCounting(false);
            }}/>
            <StopWatchButton text="Reset" handleClick={() => {
                setCounting(false);
                setSeconds(0);
                setMinutes(0);
                setHours(0);
            }}/>
        </div>
    )
}