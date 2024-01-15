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

    function getDisplayText(givenMilliseconds: number) : string {
        let milliseconds = givenMilliseconds%1000
        let seconds = Math.floor(givenMilliseconds/1000)%60
        let minutes = Math.floor(givenMilliseconds/1000/60)

        let formatTime = (time: number) => {return time.toLocaleString('en-US', {minimumIntegerDigits: 2, maximumFractionDigits: 0})};

        return `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    }

    return(
        <div>
            <h1>{getDisplayText(counter)}</h1>
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
                    <li id={`lap-${index}`}>Lap #{index} : {getDisplayText(lap)}</li>
                ))}
            </div>
        </div>
    )
}