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
    const [centiseconds, setCentiseconds] = useState<number>(0)
    const [laps, setLaps] = useState<Lap[]>([])


    // Runs everytime timerON and seconds is updated
    useEffect(() => {
        let stopWatchInterval: NodeJS.Timer
        // If timerOn is true, invokes updateTimer function every centisecond
        if (timerOn) {
            stopWatchInterval = setInterval(updateTimer, 10)
        }
        // stops setInterval function
        return () => { clearInterval(stopWatchInterval) }

    }, [timerOn, seconds])


    // Function that updates the stop watch when it is clicked on
    const updateTimer = () => {
        setCentiseconds((centiSecond) => {
            // If centisecond is about to reach 100, reset back to zero and 1 will be added to seconds
            if (centiSecond === 99) {
                // If seconds is about to reach 60, reset back to zero and 1 will be added to minutes
                if (seconds === 59) {
                    setMinutes(minutes + 1)
                    setSeconds(0)
                } else {
                    setSeconds(seconds + 1)
                }
                return 0
            } else {
                // timer counts in centiseconds
                return centiSecond + 1
            }
        })
    }


    // Calculates time between each lap
    const calculateLapTime = () => {
        const lapsArray = [...laps]
        const lastLap = laps[laps.length - 1]
        let calculatedCentiSeconds: number
        let calculatedSeconds: number
        let calculatedMinutes: number

        calculatedMinutes = minutes - lastLap.realMinutes

        // prevent negative second values and subtracts 1 from minutes if there would have been a negative second value
        if (seconds < lastLap.realSeconds) {
            calculatedMinutes--
            calculatedSeconds = 60 + seconds - lastLap.realSeconds
        } else {
            calculatedSeconds = seconds - lastLap.realSeconds
        }

        // prevent negative centisecond values and subtracts 1 from minutes if there would have been a negative centisecond value
        if (centiseconds < lastLap.realCentiseconds) {
            calculatedSeconds--
            calculatedCentiSeconds = 100 + centiseconds - lastLap.realCentiseconds
        } else {
            calculatedCentiSeconds = centiseconds - lastLap.realCentiseconds
        }

        // pushes new lap object into laps array
        lapsArray.push({
            realMinutes: minutes,
            realSeconds: seconds,
            realCentiseconds: centiseconds,
            calculatedMinutes: calculatedMinutes,
            calculatedSeconds: calculatedSeconds,
            calculatedCentiseconds: calculatedCentiSeconds
        })
        setLaps(lapsArray)
    }

    const recordLap = () => {
        if (laps.length === 0) {
            const lap: Lap = {
                realMinutes: minutes,
                realSeconds: seconds,
                realCentiseconds: centiseconds,
                calculatedMinutes: minutes,
                calculatedSeconds: seconds,
                calculatedCentiseconds: centiseconds
            }
            setLaps([lap])

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
            setCentiseconds(0)
            setLaps([])
        } else {
            recordLap()
        }
    }



    return (
        <div className='timer'>
            <p className='timer__time-display'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}.{centiseconds < 10 ? "0" + centiseconds : centiseconds}</p>
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