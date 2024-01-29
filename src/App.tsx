import React, {useState} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    return(
        <div>
            <h1>Stopwatch</h1>
            <StopWatch/>
            <div>
                <StopWatchButton text='Start'/>
                <StopWatchButton text='Stop'/>
                <StopWatchButton text='Reset'/>
                <StopWatchButton text='Lap'/>
            </div>
        </div>
    );
}