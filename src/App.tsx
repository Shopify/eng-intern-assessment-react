import React from 'react'
import { useState } from 'react';

import StopWatchButton from './StopWatchButton'
import StopWatch from './StopWatch'

export default function App() {
    const [isStopped, setIsStopped] = useState(true);
    const [time, setTime] = useState(0);
    
    return(
        <div>
            <StopWatch isStopped={isStopped} 
                       setIsStopped={setIsStopped} 
                       time={time} 
                       setTime={setTime}/>
            <StopWatchButton isStopped={isStopped} 
                             setIsStopped={setIsStopped} 
                             time={time} 
                             setTime={setTime}/>
        </div>
    )
}