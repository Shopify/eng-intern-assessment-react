import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import "./App.css"

export default function App() {
    return(
        <div className="app-container">
            <StopWatch />
            <StopWatchButton />
        </div>
    )
}