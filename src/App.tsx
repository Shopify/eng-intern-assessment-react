import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [counter, setCounter] = useState(0);
    const [secCounter, setSecCounter] = useState(0);
    const [running, setRunning] = useState(false);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        if(running) {
            const timer = setInterval(() => {
                setCounter(c => c + 25);
            }, 25);
            // 4 is chosen here because updating any faster results in incorrect timing
            // 4 ended up also being incorrect upon multiple tests
            // 25 chosen again as it's much higher than the previous minimum I encountered. (15)
        return () => clearInterval(timer);
        }
    }, [running]);

    
function toggleTimer() {
    setRunning(r => !r);
}

function reset() {
    setCounter(0);
    setSecCounter(0);
}

function lap() {
    setLaps(l => [...l, counter]);
    reset();
}

    return(
        <div>
            <StopWatch time={counter} />
            <StopWatchButton onclick={toggleTimer} name='Play/Pause' />
            <StopWatchButton onclick={lap} name='Lap' />
            <StopWatchButton onclick={reset} name='Reset' />
            {laps.length > 0 && <div>
                <h2>Laps:</h2>
                <ul>
                    {laps.map((lap: number, ind: number) => {
                        const timeString: string = Math.floor(lap / 60000) + ":" + Math.floor(lap / 1000) + ":" + lap % 1000;
                        return (
                            <li>
                                <p>Lap {ind+1}: {timeString}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </div>
    )
}
