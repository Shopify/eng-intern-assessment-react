import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import { useState, useEffect } from 'react'
import formatTime from './utils/formatTime'
import LapTimes from './LapTimes'
import "./styles.css"

export default function App() {
    const [time, setTime] = useState<number>(0)
    const [stopWatchOn, setStopWatchOn] = useState<boolean>(false)
    const [lapTimes, setLapTimes] = useState<string[]>([])

    useEffect(() => {
        let interval: NodeJS.Timeout
    
        const updateTimeInterval = () => {
            setTime((prevTime) => prevTime + 10) // updates time by adding 10ms every 10ms
        }

        // If the stopwatch is on update time otherwise clear interval
        if (stopWatchOn) {
            interval = setInterval(updateTimeInterval, 10)
        }
        
        return () => clearInterval(interval)
    }, [stopWatchOn])

    const handleStopButtonClick = () => {
        setStopWatchOn(false)
    }

    const handleStartButtonClick = () => {
        setStopWatchOn(true)
    }

    const handleRestartButtonClick = () => {
        if (stopWatchOn) {
            setStopWatchOn(false)
        }
        setLapTimes([])
        setTime(0)
    }

    const handleLapButtonClick = () => {
        setLapTimes((prevLapTimes) => [...prevLapTimes, formatTime(time)])
    }

    return(
        <div className='container'>
            <StopWatch time={time}/>
            <div className='buttons'>
                {/* If stopwatch is on display stop button else the start button */}
                {stopWatchOn? (
                    <StopWatchButton label={"STOP"} color={"red"} onButtonClick={handleStopButtonClick}/>
                ) : (
                    <StopWatchButton label={"START"} color={"green"} onButtonClick={handleStartButtonClick}/>
                )}
                <StopWatchButton label={"LAP"} color={"orange"} onButtonClick={handleLapButtonClick}/>
                <StopWatchButton label={"RESTART"} color={"blue"} onButtonClick={handleRestartButtonClick}/>
            </div>
            <LapTimes lapTimes={lapTimes}></LapTimes>
        </div>
    )
}
