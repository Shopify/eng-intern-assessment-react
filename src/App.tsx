import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    return(
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{ fontSize: '32px' }}>Stopwatch</h1>
            <StopWatch />
            <StopWatchButton />
        </div>
    )
}