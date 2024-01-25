import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const [timerOn, setTimerOn] = useState<boolean>(false)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [laps, setLaps] = useState<number>(0)

    useEffect(() => {
        let stopWatchInterval: NodeJS.Timer

        if (timerOn) {
            stopWatchInterval = setInterval(updateTimer, 1000)
        }
        return () => { clearInterval(stopWatchInterval) }

    }, [timerOn, seconds])

    const updateTimer = () => {
        setSeconds((seconds) => {
            if (seconds === 59) {
                setMinutes(minutes + 1)
                return 0
            } else {
                return seconds + 1
            }
        })
    }

    const handleToggleTimer = () => {
        if (timerOn === false) {
            setTimerOn(true)
        } else {
            setTimerOn(false)
        }
    }

    const handleLapResetClick = () => {
        if (timerOn === false) {
            setMinutes(0)
            setSeconds(0)
            setLaps(0)
        } else {
            setLaps(laps + 1)
        }
    }



    return (
        <div>
            <p className='timer__display'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
            <p>{laps}</p>
            <StopWatchButton
                timerOn={timerOn}
                handleToggleTimer={handleToggleTimer}
                handleLapResetClick={handleLapResetClick}
            />
        </div>
    )
}