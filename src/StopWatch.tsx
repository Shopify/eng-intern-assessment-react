import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import './StopWatch.css'

export default function StopWatch() {
    const [isGoing, setIsGoing] = useState(false)
    const [currTime, setCurrTime] = useState(0)
    const [currLaps, setCurrLaps] = useState(1)
    const [buttonText, setButtonText] = useState('Start')

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>

        if (isGoing) {
            interval = setInterval(() => setCurrTime(currTime + 1), 10)
        }
        return () => clearInterval(interval)
    }, [isGoing, currTime])

    const clickStart = () => {
        if (buttonText === 'Start') {
            setIsGoing(true)
            setButtonText('Stop')
        } else {
            setIsGoing(false)
            setButtonText('Start')
        }
    }
    const clickReset = () => {
        setIsGoing(false)
        setCurrTime(0)
        setButtonText('Start')
        setCurrLaps(1)
    }
    const clickLap = () => {
        if (buttonText === 'Stop') {
            setCurrTime(0)
            setCurrLaps(currLaps + 1)
        }
    }

    return(
        <div >
            <div className='container'>
                <StopWatchButton handleClick={clickStart} action={buttonText} color='green'/>
            </div>
            <div className='timer'>
                {Math.floor(currTime / 360000)}:{Math.floor((currTime % 360000) / 6000)}:{Math.floor((currTime % 6000) / 100)}:{currTime % 100}
            </div>
            <div className='container'>
                <StopWatchButton handleClick={clickReset} action={"Reset"} color='#ADDFFF'/>
            </div>
            <div className='container'>
                <StopWatchButton handleClick={clickLap} action={`Lap ${currLaps}`} color='#ADDFFF'/>
            </div>
        </div>
    )
}