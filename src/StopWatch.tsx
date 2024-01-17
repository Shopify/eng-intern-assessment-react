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
    }

    function getDisplayText(givenMilliseconds: number): string {
        let milliseconds = givenMilliseconds % 1000
        let seconds = Math.floor(givenMilliseconds / 1000) % 60
        let minutes = Math.floor(givenMilliseconds / 1000 / 60)

        //Make formater function to change time values to strings in the appropiate format
        let formatTime = (time: number) => { return time.toLocaleString('en-US', { minimumIntegerDigits: 2, maximumFractionDigits: 0 }) };

        return `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
    }

    return (
        <div id='stopwatch-container'>
            <h1 id='stopwatch-display'>{getDisplayText(counter)}</h1>
            <div id='stopwatch-buttons'>
                {!isRunning && <StopWatchButton id='start-button' onClick={() => { setIsRunning(true) }} content='Start'></StopWatchButton>}
                {isRunning && <StopWatchButton id='stop-button' onClick={() => { setIsRunning(false) }} content='Stop'></StopWatchButton>}
                <StopWatchButton id='lap-button' onClick={handleOnLap} content='Lap'></StopWatchButton>
                <StopWatchButton id='reset-button' onClick={handleOnReset} content='Reset'></StopWatchButton>
            </div>
            <div id='lap-list' data-testid='lap-list'>
                {lapList.length > 0 &&
                    <table id='lap-list-table'>
                        <tr id={`lap-list-table-header`}>
                            <th>Lap #</th>
                            <th>Lap Time</th>
                            <th>Total Time</th>
                        </tr>
                        {lapList.map((lap, index) => (
                            <tr id={`lap-${index}`}>
                                <th>{index}</th>
                                <th>{getDisplayText(index > 0 ? lap - lapList[index - 1] : lap)}</th>
                                <th>{getDisplayText(lap)}</th>
                            </tr>
                        ))}
                    </table>
                }
            </div>
        </div>
    )
}