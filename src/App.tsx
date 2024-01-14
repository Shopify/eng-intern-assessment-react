import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { ButtonGroup } from 'react-bootstrap'

export default function App() {
    return(
        <div>
            <StopWatch milliSeconds={10}></StopWatch>
            <div>
                <StopWatchButton content='Start'></StopWatchButton>
                <StopWatchButton content='Pause'></StopWatchButton>
                <StopWatchButton content='Resume'></StopWatchButton>
                <StopWatchButton content='Lap'></StopWatchButton>
                <StopWatchButton content='Reset'></StopWatchButton>
            </div>
        </div>
    )
}