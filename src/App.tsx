import React, { useEffect, useState } from 'react'

import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    let intervalID: ReturnType<typeof setInterval>;

    const [counter, setCounter] = useState(0);
    const [counting, setCounting] = useState(false);

    useEffect(() => {
        if (counting) {
            intervalID = setInterval(() => {
                setCounter(counter => counter + 1);
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
            <StopWatch seconds={counter}/>
            <StopWatchButton text="Start" handleClick={() => {
                setCounting(true);
            }}/>
            <StopWatchButton text="Stop" handleClick={() => {
                setCounting(false);
            }}/>
        </div>
    )
}