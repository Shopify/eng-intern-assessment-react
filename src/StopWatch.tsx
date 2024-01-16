import React, { useRef, useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const timerIncrementMs = 10

    const intervalId = useRef(0)
    const [pause, setPause] = useState<boolean>(false)
    const [exists, setExists] = useState<boolean>(false)
    const [time, setTime] = useState<number>(0)
    const [laps, setLaps] = useState<number[]>([])

    const startTime = () => {
        stopTime()
        setTime(0)
        setLaps([])
        const id = window.setInterval(() => {
            setPause(p => {
                if (!p) {
                    setTime(prevTime => (prevTime + timerIncrementMs))
                }
                return p
            })
        }, timerIncrementMs)
        intervalId.current = id
        setExists(true)

        setPause(false)
    }

    const togglePause = () => {
        setPause(!pause)
    }

    const stopTime = () => {
        window.clearInterval(intervalId.current)
        setExists(false)
        setPause(true)
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
                    isPaused: pause
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