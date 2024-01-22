import React from 'react'
import { StopWatchProvider } from './StopWatchContext'
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch'

export default function App() {
    return(
        <StopWatchProvider>
            <StopWatchButton />
            <StopWatch />
        </StopWatchProvider>
    )
}