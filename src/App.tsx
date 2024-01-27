import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

function App() {
    return(
        <div>
            <StopWatch />
            <div>
                <StopWatchButton />
                <StopWatchButton />
                <StopWatchButton />
            </div>
        </div>
    )
}

export default App;