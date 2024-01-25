import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const [timerOn, setTimerOn] = useState<boolean>(false)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [centiSeconds, setCentiSeconds] = useState<number>(0)
    const [laps, setLaps] = useState<number>(0)


    useEffect(() => {
        let stopWatchInterval: NodeJS.Timer

        if (timerOn) {
            stopWatchInterval = setInterval(updateTimer, 100)
        }
        return () => { clearInterval(stopWatchInterval) }

    }, [timerOn, seconds])


    const updateTimer = () => {
        setCentiSeconds((centiSecond) => {
            if (centiSecond === 9) {
                if (seconds === 59) {
                    setMinutes(minutes + 1)
                    setSeconds(0)
                } else {
                    setSeconds(seconds + 1)
                }
                return 0
            } else {
                return centiSecond + 1
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
            <p className='timer__display'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}.{centiSeconds < 10 ? "0" + centiSeconds : centiSeconds}</p>
            <p>{laps}</p>
            <StopWatchButton
                timerOn={timerOn}
                handleToggleTimer={handleToggleTimer}
                handleLapResetClick={handleLapResetClick}
            />
        </div>
    )
}