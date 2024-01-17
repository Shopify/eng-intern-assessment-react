import React from 'react'
import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch'
export default function App() {
    return (
        <div> 
            <StopWatch time={0} /> 
            <StopWatchButton title="Start" func={() => console.log('Start')} />
            <StopWatchButton title="Stop" func={() => console.log('Stop')} />
            <StopWatchButton title="Reset" func={() => console.log('Reset')} />
            <StopWatchButton title="Lap" func={() => console.log('Lap')} />
        </div>
    )
}