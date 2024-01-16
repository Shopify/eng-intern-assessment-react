import React from 'react'
import StopWatch from './StopWatch'
import './App.css';

export default function App() {
    return(
        <section className='stopwatch-section'>
            <div className='stopwatch-div'>
                <h1 className='stopwatch-title'>Your StopWatch</h1>
                <StopWatch />
            </div>
        </section>
    )
}