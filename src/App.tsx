import React, { useState } from 'react'
import StopWatch from './StopWatch'
import './css/App.css'
import StopWatchButton from './StopWatchButton'

 export default function App() {
     const [isRunning, setIsRunning] = useState<boolean>(false);
     const [reset, setReset] = useState<boolean>(false);

     const handleOnStart = () => {
         setIsRunning(true);
     }

     const handleOnStop = () => {
         setIsRunning(false);
     }

     const handleReset = () => {
         setReset(true);
    }
    return(
        <div className='stopwatch-container'>
            <StopWatch isRunning= {isRunning} reset={reset}>
            </StopWatch>
            <StopWatchButton type ={'start'} onClick={handleOnStart}/>
        </div>
    )
} 
