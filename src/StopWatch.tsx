import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
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
        setLapList(lapList => [...lapList, counter]);
        setCounter(0)
    }

    function getMilliseconds() : string {
        return (counter%1000).toLocaleString('en-US', {minimumIntegerDigits: 2}).slice(0,2)
    }
    function getSeconds() : string {
        var seconds = Math.floor(counter/1000)%60
        return seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})
    }
    function getMinutes() : string {
        var minutes = Math.floor(counter/1000)/60
        return minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, maximumFractionDigits: 0})
    }

    return(
        <div>
            <h1>{getMinutes()}:{getSeconds()}:{getMilliseconds()}</h1>
            <div>
                <StopWatchButton onClick={() => { setIsRunning(true) }} content='Start'></StopWatchButton>
                <StopWatchButton onClick={() => { setIsRunning(false) }} content='Pause'></StopWatchButton>
                <StopWatchButton onClick={() => { setIsRunning(false) }} content='Stop'></StopWatchButton>
                <StopWatchButton onClick={() => { setIsRunning(true) }} content='Resume'></StopWatchButton>
                <StopWatchButton onClick={handleOnLap} content='Lap'></StopWatchButton>
                <StopWatchButton onClick={handleOnReset} content='Reset'></StopWatchButton>
            </div>
            <div id='lap-list' data-testid='lap-list'>
                {lapList.map( (lap, index) => (
                    <li>Lap {index} : {lap}</li>
                ))}
            </div>
        </div>
    )
}