import React from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    return(
        <div>
            <StopWatchButton onClick={() => {}} label={"Start"}/>
            <StopWatchButton onClick={() => {}} label={"Stop"}/>
            <StopWatchButton onClick={() => {}} label={"Reset"}/>
            <StopWatchButton onClick={() => {}} label={"Lap"}/>
        </div>
    )
}
