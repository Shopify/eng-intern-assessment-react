import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'


export default function App() {
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)

    /**
     * Function that uses setTimeout to simulate delay
     * @param timetoDelay time to return Promise
     * @returns empty Promise
     */
    const delay = (timetoDelay: number) => {
        return new Promise(res => setTimeout(res, timetoDelay))
    }

    /**
     * useEffect hook will run every time stopwatch start/stops
     * or time is incremented
     */
    useEffect(() => {
        if (isRunning) {
            // make delay to add to counter
            // 00mins : 00secs: 00 millis
            delay(10).then(() => {
                setTime(time + 1)
                console.log('time', time)
            })
        }
    }, [isRunning, time])

    const handleReset = () => {
        setTime(0)
    }
    
    const handleLap = () => {

    }

    const handleStart = () => {
        setIsRunning(true)
    }

    const handleStop = () => {
        setIsRunning(false)
    }

    return(
        <div>
            <StopWatch timeInTenMillis={time}/>
            <StopWatchButton
                isRunning={isRunning}
                start={handleStart}
                stop={handleStop}
                lap={handleLap}
                reset={handleReset}
            />
        </div>
    )
}