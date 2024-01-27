import React, { useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(false);

    return(
        <div>
            <h1>StopWatch</h1>
            <p>00:00:00</p>
            <StopWatchButton type={'start'} onClick={() => {}}></StopWatchButton>
            <StopWatchButton type={'stop'} onClick={() => setTimerOn(false)}></StopWatchButton>
            <StopWatchButton type={'lap'} onClick={() => {}}></StopWatchButton>
            <StopWatchButton type={'reset'} onClick={() => setTimerOn(false)}></StopWatchButton>
        </div>
    )
}