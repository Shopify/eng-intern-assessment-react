// Overall app
// TODO:
// - add stopwatch display functionality (ie. just counting up time) - done
// - add start functionality
// - add stop functionality
// - add reset functionality
// - add lap functionality
import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
export default function App() {
    return(
        <div>
            <StopWatch></StopWatch>
            <StopWatchButton></StopWatchButton>
        </div>
    )
}