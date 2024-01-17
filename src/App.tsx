import React, { useState } from 'react'

import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [counter, setCounter] = useState(0);

    function startStopWatch() {
        setInterval(() => {
            setCounter(counter => counter + 1);
        }, 1000)
    }

    const handleButtonClick = () => {
        console.log("clicked");
        startStopWatch();
    }

    return(
        <div>
            <StopWatch seconds={counter}/>
            <StopWatchButton text="Start" handleClick={handleButtonClick}/>
        </div>
    )
}