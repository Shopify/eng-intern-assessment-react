import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

// This is the main app, where the stop watch will get displayed as well as the button to start/stop/reset the time
export default function App() {
    return(
        <div className='app-container'>
            <div className="center-text center-element-vertical-horizontal">
                <StopWatch/>
            </div>
        </div>
    )
}