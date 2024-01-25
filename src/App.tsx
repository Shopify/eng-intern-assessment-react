import React from 'react'
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {

    return(
        <div>
            <h1>Stop Watch</h1>
            <StopWatch></StopWatch>
            <StopWatchButton></StopWatchButton> 
        </div>
    )
}