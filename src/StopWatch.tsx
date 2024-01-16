import React, { useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const timerIncrementMs = 10
    const pause = useRef(true)
    const intervalId = useRef(0)
    const [exists, setExists] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0)
    const [laps, setLaps] = useState<number[]>([])

    const startTime = () => {
        stopTime()
        setTime(0)
        setLaps([])
        const id = window.setInterval(() => {
            if (!pause.current) {
                setTime(prevTime => (prevTime + timerIncrementMs))
            }
        }, timerIncrementMs)
        intervalId.current = id
        setExists(true)
        pause.current = false
    }

    const togglePause = () => {
        pause.current = !pause.current
    }

    const stopTime = () => {
        window.clearInterval(intervalId.current)
        setExists(false)
        pause.current = true
    }

    return(
        <div>
            <p style={{
                fontSize: 24
            }}>{time} ms</p>
            <StopWatchButton
                timerState={{
                    exists: exists,
                    time: time,
                    isPaused: pause.current
                }}
                onStartClicked={startTime}
                onLapClicked={() => { setLaps([...laps, time]) }}
                onStopClicked={stopTime}
                onPauseClicked={togglePause}
            />
            {laps.map((v:number, i:number) => (
                <p key={i}>{`Lap ${i}: ${v} ms`}</p>
            ))}
        </div>
    )
}