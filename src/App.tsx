import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [counter, setCounter] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [lapList, setLapList] = useState([])

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setCounter(counter => counter + 1)
        }, 1);
        return () => clearInterval(interval);
    }, [isRunning])

    let handleOnReset = () => {
        setCounter(0)
        setIsRunning(false)
        setLapList([])
    }

    let handleOnLap = () => {
        setLapList( lapList => [...lapList, counter]);
        setCounter(0)
    }

    return (
        <div>
            <StopWatch milliSeconds={counter}></StopWatch>
            <div>
                <StopWatchButton onClick={() => { setIsRunning(true) }} content='Start'></StopWatchButton>
                <StopWatchButton onClick={() => { setIsRunning(false) }} content='Pause'></StopWatchButton>
                <StopWatchButton onClick={() => { setIsRunning(true) }} content='Resume'></StopWatchButton>
                <StopWatchButton onClick={handleOnLap} content='Lap'></StopWatchButton>
                <StopWatchButton onClick={handleOnReset} content='Reset'></StopWatchButton>
            </div>
            <div id='lap-list'>
                {lapList.map( (lap, index) => (
                    <li>Lap {index} : {lap}</li>
                ))}
            </div>
        </div>
    )
}