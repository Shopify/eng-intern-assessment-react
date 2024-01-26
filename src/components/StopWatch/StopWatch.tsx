import React, { useEffect, useState } from 'react'
import StopWatchButton from '../StopWatchButton/StopWatchButton'
import './StopWatch.scss'

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

    }, [timerOn])


    // Function that updates the stop watch when it is clicked on
    const updateTimer = () => {
        setCentiseconds((centiSecond) => {

            let newCentiseconds: number = centiSecond + 1
            // If centisecond is about to reach 100, reset back to zero and 1 will be added to seconds
            if (newCentiseconds === 100) {
                newCentiseconds = 0
                // If seconds is about to reach 60, reset back to zero and 1 will be added to minutes
                if (seconds === 59) {
                    setMinutes((prevMinute) => prevMinute + 1)
                    setSeconds(0)
                } else {
                    setSeconds((prevSecond) => prevSecond + 1)
                }
            }
            // timer counts in centiseconds
            return newCentiseconds

        })
    }


    // Calculates time between each lap 
    const calculateLapTime = () => {
        const lapsArray: Lap[] = [...laps]
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


    // Records lap into laps array
    const recordLap = () => {
        // if first lap recorded, no need to calculate time
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
            // if not the first lap recorded, need to calculate lap time
            calculateLapTime()
        }
    }

    // Sets timerOn to opposite boolean when toggled
    const handleToggleTimer = () => {
        if (!timerOn) {
            setTimerOn(true)
        } else {
            setTimerOn(false)
        }
    }


    const handleLapResetClick = () => {
        // If timerOn is false, reset time and laps
        if (!timerOn) {
            setMinutes(0)
            setSeconds(0)
            setCentiseconds(0)
            setLaps([])
        } else {
            // If timerOn is true, record the lap
            recordLap()
        }
    }



    return (
        <div className='timer'>

            <h1 className='timer__time-display' data-testid='timer-display'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}.{centiseconds < 10 ? "0" + centiseconds : centiseconds}</h1>

            <StopWatchButton
                timerOn={timerOn}
                handleToggleTimer={handleToggleTimer}
                handleLapResetClick={handleLapResetClick}
            />

            <div className='timer__lap-display'>
                <div className="timer__lap-display__header-container">
                    <h2 className='timer__lap-display__header'>Lap Number</h2>
                    <h2 className='timer__lap-display__header'>Lap Time</h2>
                </div>
                {laps.map((lap, index) => {
                    return (
                        <div key={index} className='timer__lap-display__container' data-testid='lap-object'>
                            <p className='timer__lap-display__text' data-testid={`lap-${index + 1}`}>{index + 1}</p>
                            <p className='timer__lap-display__text'>{lap.calculatedMinutes < 10 ? "0" + lap.calculatedMinutes : lap.calculatedMinutes}:{lap.calculatedSeconds < 10 ? "0" + lap.calculatedSeconds : lap.calculatedSeconds}.{lap.calculatedCentiseconds < 10 ? "0" + lap.calculatedCentiseconds : lap.calculatedCentiseconds}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}