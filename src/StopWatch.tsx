import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import './StopWatch.css';

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

        //Make formater function to change time values to strings in the appropiate format
        let formatTime = (time: number) => {return time.toLocaleString('en-US', {minimumIntegerDigits: 2, maximumFractionDigits: 0})};

        return `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    }

    return(
        <div id='stopwatch-container'>
            <h1 id='stopwatch-display'>{getDisplayText(counter)}</h1>
            <div id='stopwatch-buttons'>
                {!isRunning && <StopWatchButton id='start-button' onClick={() => { setIsRunning(true) }} content='Start'></StopWatchButton>}
                {isRunning && <StopWatchButton id='stop-button' onClick={() => { setIsRunning(false) }} content='Stop'></StopWatchButton>}
                <StopWatchButton id='lap-button' onClick={handleOnLap} content='Lap'></StopWatchButton>
                <StopWatchButton id='reset-button' onClick={handleOnReset} content='Reset'></StopWatchButton>
            </div>
            <div id='lap-list' data-testid='lap-list'>
                {lapList.map( (lap, index) => (
                    <li id={`lap-${index}`} key={index}>Lap #{index} : {getDisplayText(lap)}</li>
                ))}
            </div>
        </div>
    )
}