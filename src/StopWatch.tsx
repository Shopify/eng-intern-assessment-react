import React, { useState, useEffect, useReducer } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    const [startedAt, setStartedAt] = useState(0)
    const [elapsed, setElapsed] = useState(0)
    const [running, setRunning] = useState(false)
    const [laps, setLaps] = useState([]) //laps are stored as their start times
    
    const currentTime = elapsed + (running ? (Date.now() - startedAt) : 0)
    const showReset = currentTime !== 0 && !running

    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / (3600 * 1000))
        const minutes = Math.floor((ms % (3600*1000)) / (1000*60))
        const seconds = Math.floor((ms % (60*1000)) / 1000)
        const milliseconds = Math.floor(ms % 1000)
        return `${hours.toFixed().padStart(2, '0')}:${minutes.toFixed().padStart(2, '0')}:${seconds.toFixed().padStart(2, '0')}.${milliseconds.toFixed().padStart(3, '0')}`
    }

    const startHandler = () => {
        setRunning(true)
        setStartedAt(Date.now())
        if (laps.length === 0)
            setLaps([ 0 ]);
    }

    const stopHandler = () => {
        setRunning(false)
        setElapsed(elapsed + (Date.now() - startedAt))
    }

    const lapHandler = () => {
        setLaps([ ...laps, currentTime ])
    }

    const resetHandler = () => {
        setRunning(false)
        setElapsed(0)
        setLaps([])
    }

    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate()
        }, 1000 / 30) //30 fps
      
        return () => {
            clearInterval(interval)
        }
      }, [])

    return (
        <div className='h-full flex flex-col'>
            <div className='h-1/3 border-b-2 flex justify-center items-center border-neutral-200 dark:border-neutral-800'>
                <div className='text-3xl font-mono'>
                    {formatTime(currentTime)}
                </div>
            </div>
            <div className='h-32 border-b-2 border-neutral-200 dark:border-neutral-800'>
                <div className='flex justify-around items-center h-full'>
                    <StopWatchButton color={(showReset || running) ? 'gray' : 'disabled'} onClick={showReset ? resetHandler : lapHandler}>
                        {showReset ? 'Reset' : 'Lap'}
                    </StopWatchButton>
                    <StopWatchButton color={running ? 'red' : 'green'} onClick={running ? stopHandler : startHandler}>
                        {running ? 'Stop' : 'Start'}
                    </StopWatchButton>
                </div>
            </div>
            <div className='flex-grow'>
                {/* calculate lap times (difference of start times) and display in reverse */}
                {[...laps, currentTime]
                    .map((x, idx, arr) => idx === 0 ? NaN : arr[idx] - arr[idx - 1])
                    .filter(x => !isNaN(x))
                    .reverse()
                    .map((x, idx, arr) => (
                        <div key={idx} className='mx-8 px-8 h-16 border-b-2 flex justify-between items-center border-neutral-200 dark:border-neutral-800'>
                            <div>Lap {arr.length - idx}</div>
                            <div>{formatTime(x)}</div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}