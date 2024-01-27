import React from 'react'
import StopWatch, { LapTimes } from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    return(
        <div className='App'>
            <StopWatch />
            <StopWatchButton />
            <LapTimes />
        </div>
    )
}