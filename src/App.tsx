import React from 'react'

import StopWatch from './StopWatch'
import './css/app.css'

export default function App() {
    return(
        <div className='container'>
            <div className="title">Simple Stopwatch</div>
            <StopWatch/>
        </div>
    )
}