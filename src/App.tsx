import React from 'react';
import './App.css';
import StopWatch from './StopWatch';

export default function App() {
    return(
        <div className = "App">
            <span className='header'>Stopwatch</span>
            <StopWatch/>
        </div>
    )
}