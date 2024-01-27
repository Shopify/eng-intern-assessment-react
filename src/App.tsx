import React from 'react'
import ReactDOM from 'react-dom'
import StopWatch from './StopWatch'

export default function App() {
    return(
        <div className='App'>
            <h1>Stopwatch App</h1>
            <StopWatch />
        </div>
    )
}

// Got stuck trying to find how to add App to the .html file but realize that's already been taken care of in index.tsx