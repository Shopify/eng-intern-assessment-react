import React from 'react'
import StopWatch from './components/StopWatch'
import './App.css'


export default function App() {
    return(
        <div className='container'>
            <section className='title-wrapper'>
                <h1 className='title-name'>Stopwatch App</h1>
                <p className='title-caption'>Made by Pratik Solanki</p>
            </section>
        
            <StopWatch />
        </div>
    )
}