import React from 'react'
import './style.css';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

export default function App() {
    return(
        <main className='body'>
            <StopWatch />
            <StopWatchButton />
        </main>
    )
}