import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'


export default function StopWatch() {

    type Lap = {
        realMinutes: number,
        realSeconds: number,
        realCentiseconds: number,
        calculatedMinutes: number
        calculatedSeconds: number
        calculatedCentiseconds: number
    }

    const [timerOn, setTimerOn] = useState<boolean>(false)
    const [minutes, setMinutes] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(0)
    const [centiSeconds, setCentiSeconds] = useState<number>(0)
    const [laps, setLaps] = useState<Lap[]>([])


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


    const calculateLapTime = () => {
        const lastLap = laps[laps.length - 1]
        let calculatedCentiSeconds: number
        let calculatedSeconds: number
        let calculatedMinutes: number

        calculatedMinutes = minutes - lastLap.realMinutes

        if (seconds < lastLap.realSeconds) {
            calculatedMinutes--
            calculatedSeconds = 60 + seconds - lastLap.realSeconds
        } else {
            calculatedSeconds = seconds - lastLap.realSeconds
        }

        if (centiSeconds < lastLap.realCentiseconds) {
            calculatedSeconds--
            calculatedCentiSeconds = 100 + centiSeconds - lastLap.realCentiseconds
        } else {
            calculatedCentiSeconds = centiSeconds - lastLap.realCentiseconds
        }

        laps.push({
            realMinutes: minutes,
            realSeconds: seconds,
            realCentiseconds: centiSeconds,
            calculatedMinutes: calculatedMinutes,
            calculatedSeconds: calculatedSeconds,
            calculatedCentiseconds: calculatedCentiSeconds
        })
    }

    const recordLap = () => {
        if (laps.length === 0) {
            laps.push({
                realMinutes: minutes,
                realSeconds: seconds,
                realCentiseconds: centiSeconds,
                calculatedMinutes: minutes,
                calculatedSeconds: seconds,
                calculatedCentiseconds: centiSeconds
            })
        } else {
            calculateLapTime()
        }
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
            setCentiSeconds(0)
            setLaps([])
        } else {
            recordLap()
        }
    }



    return (
        <div className='timer'>
            <p className='timer__time-display'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}.{centiSeconds < 10 ? "0" + centiSeconds : centiSeconds}</p>
            <StopWatchButton
                timerOn={timerOn}
                handleToggleTimer={handleToggleTimer}
                handleLapResetClick={handleLapResetClick}
            />
            <div className='timer__lap-display'>
                {laps.map((lap, index) => {
                    return (
                        <div key={index} className='timer__lap-display__container'>
                            <p className='timer__lap-display__text'>{index + 1}</p>
                            <p className='timer__lap-display__text'>{lap.calculatedMinutes < 10 ? "0" + lap.calculatedMinutes : lap.calculatedMinutes}:{lap.calculatedSeconds < 10 ? "0" + lap.calculatedSeconds : lap.calculatedSeconds}.{lap.calculatedCentiseconds < 10 ? "0" + lap.calculatedCentiseconds : lap.calculatedCentiseconds}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}