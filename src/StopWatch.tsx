import React, { useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const [timerOn, setTimerOn] = useState<boolean>(false)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)

    const handleStartStopTimer = () => {
        if (timerOn === false) {
            setTimerOn(true)
        } else {
            setTimerOn(false)
        }
    }


    return (
        <div>
            <p className='timer__display'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>
            <StopWatchButton
                timerOn={timerOn}
                handleStartTimer={handleStartStopTimer}
            />
        </div>
    )
}