import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { useState } from 'react';

export default function App() {

    const [start, setStart] = useState(false);

    function setTimerStart():void {
        setStart(true);
    }

    function setTimerStop():void {
        setStart(false);
    }

    return(
        <div>
            <StopWatch start={start}></StopWatch>
            <StopWatchButton setStart={setTimerStart} setStop={setTimerStop}></StopWatchButton>
        </div>
    )
}