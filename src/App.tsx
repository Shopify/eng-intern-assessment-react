import React from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './StopWatch.css';

export default function App() {
    const stopWatchRef = React.useRef<typeof StopWatch>(null);

    return(
        <div className = "App">
            <h1>Stopwatch</h1>
            <StopWatch />
        </div>
    )
}