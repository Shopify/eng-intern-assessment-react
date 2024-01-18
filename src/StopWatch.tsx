import React from 'react'

import './StopWatch.css'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    return (
        <div>
            <div className='timer'>
                <p className='timer-text'>00</p>
                <p className='timer-colon'>:</p>
                <p className='timer-text'>00</p>
                <p className='timer-colon'>:</p>
                <p className='timer-text'>00</p>
            </div>
            <div className='buttons-container'>
                <StopWatchButton name='Start' />
                <StopWatchButton name='Stop' />
                <StopWatchButton name='Reset' />
                <StopWatchButton name='Lap' />
            </div>
        </div>
    )
}