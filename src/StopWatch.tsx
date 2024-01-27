import React from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    return(
        <div>
            <h1>StopWatch</h1>
            <p>00:00:00</p>
            <StopWatchButton type={'start'}></StopWatchButton>
            <StopWatchButton type={'stop'}></StopWatchButton>
            <StopWatchButton type={'lap'}></StopWatchButton>
            <StopWatchButton type={'reset'}></StopWatchButton>
        </div>
    )
}