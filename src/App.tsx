//The main component that renders the stopwatch and handles its functionality.

import React, { CSSProperties} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {

    const backgroundColour: CSSProperties = {
        backgroundColor: '#595b5d',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    return(
        <div style = {backgroundColour}>
            <StopWatch/>
            <StopWatchButton/>
        </div>
    )
}