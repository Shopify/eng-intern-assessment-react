import React from 'react'

import './StopWatch.css'

export default function StopWatch() {
    return(
        <div className='timer'>
            <p className='timer-text'>1</p>
            <p className='timer-colon'>:</p>
            <p className='timer-text'>2</p>
            <p className='timer-colon'>:</p>
            <p className='timer-text'>3</p>
        </div>
    )
}