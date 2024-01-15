import React from 'react'
import StopWatch from './StopWatch'
import "./App.css"

export default function App() {
    return (
        <div className='landing'>
            <h1 className='heading' >
                Stopify
            </h1>
            <div className='stopwatch-display'>
                <StopWatch />
            </div>
        </div>
    )
}
