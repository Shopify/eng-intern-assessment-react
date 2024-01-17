import React from 'react'
import '../styles/App.css'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import '../styles/StopWatch.css'

export default function App() {
    return(
        <div>
          <StopWatch/>
          <StopWatchButton/>
        </div>
    )
}