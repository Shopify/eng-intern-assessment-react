import React, {useState} from 'react'
import StopWatch from './StopWatch'
import './App.css'

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const startTimer = () => {
        setIsRunning(true)
    }
    const stopTimer = () => {
        setIsRunning(false)
    }
    return(
        <div className='container'>
            <h1>Stopwatch</h1>
            <StopWatch isRunning={isRunning} onStart={startTimer} onStop={stopTimer} />
            
        </div>
    )
}