import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

function App() {
    return(
        <div>
            <StopWatch />
            <div>
                <StopWatchButton label={"start/stop"}/>
                <StopWatchButton label={"lap"}/>
                <StopWatchButton label={"reset"}/>
            </div>
        </div>
    )
}

export default App;