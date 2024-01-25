import React, {useState} from 'react'
import StopWatch from './StopWatch'

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const startTimer = () => {
        setIsRunning(true)
    }
    const stopTimer = () => {
        setIsRunning(false)
    }
    return(
        <div>
            <h1>Stopwatch</h1>
            <StopWatch isRunning={isRunning} onStart={startTimer} onStop={stopTimer} />
            
        </div>
    )
}