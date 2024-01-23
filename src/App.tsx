import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { useState } from 'react';

export default function App() {
    //useStates for timer
    const [start, setStart] = useState(false);
    const [time, setTime] = useState(0);

    //setting functions for buttons
    function setTimerStart():void {
        setStart(true);
    }
    function setTimerStop():void {
        setStart(false);
    }
    function setTimerReset() {
        setTime(0)
    }

    return(
        <div>
            <StopWatch start={start} time={time} setTime={setTime}></StopWatch>
            <StopWatchButton setStart={setTimerStart} setStop={setTimerStop} setReset={setTimerReset}></StopWatchButton>
        </div>
    )
}