import React from 'react'
import StopWatch from './StopWatch';
import './App.css';

export default function App() {
    return(
        <main className='app-container'>
            <h1>STOPWATCH</h1>
            <section>
                <StopWatch/>
            </section>
        </main>
    )
}