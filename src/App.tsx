import React from 'react'
import StopWatch from './StopWatch'
import "./App.css"

/**
 * 
 * @description The main application component.
 * @author Sana Khademi
 * @version 1.0.0 
 */
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
