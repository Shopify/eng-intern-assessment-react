import React, { useState, useEffect, useRef } from 'react'
import StopWatch from './StopWatch'


export default function App() {
    const [milliseconds, setMilliseconds] = useState(0)
    const [lapTime, setLapTime] = useState(0)
    const [watchStarted, setWatchStarted] = useState(false)
    const [laps, setLaps] = useState<number[]>([])

    const [intervalID, setIntervalID] = useState<ReturnType<typeof setInterval> | null>(null)
    const [lapIntervalID, setLapIntervalID] = useState<ReturnType<typeof setInterval> | null>(null)


    const handleStart = (): void => {
        // if watch has not started yet, then start it
        if (!watchStarted) {
            // if we have dont' have a previous time, then set the current date as
            // the start time. Otherwise, we need to set the start time to the previous time
            const start = milliseconds === 0 ? Date.now() : Date.now() - milliseconds

            setIntervalID(setInterval(() => {
                setMilliseconds(Date.now() - start)
            }, 10))

            // if we click lap then set lap time to the current milliseconds
            // allows us to pause and start the lap timer along with
            // the main timer
            if (lapTime) {
                const lapStart = Date.now() - lapTime
                setLapIntervalID(setInterval(() => {
                    setLapTime(Date.now() - lapStart)
                }, 10))
            }

        } else {

            // if watch has started, then stop it
            // stop main timer
            clearInterval(intervalID)

            // stop lap timer
            clearInterval(lapIntervalID)
        }

        setWatchStarted(!watchStarted)
    }

    const handleLap = (): void => {

        // clear the previous lap interval
        clearInterval(lapIntervalID)

        // if we click lap then set lap time to the current milliseconds
        const start = Date.now()
        setLapIntervalID(setInterval(() => {
            setLapTime(Date.now() - start)
        }, 10))

        // add the current time to the laps array
        setLaps((prev) => [...prev, lapTime ? lapTime : milliseconds])


    }
    const handleReset = (): void => {
        // reset the milliseconds
        setMilliseconds(0)
        setLapTime(0)

        // clear the intervals
        clearInterval(intervalID)
        clearInterval(lapIntervalID)

        // clear the laps
        setLaps([])

        // stop the watch
        setWatchStarted(false)
    }


    const displayLaps = () => {
        return (
            <>
                {laps.map((lap, index) => {
                    return (
                        <li key={`${lap} + ${index}`}>Lap {index + 1}: {displayTime(lap)}</li>
                    )
                })}
            </>
        )
    }

    const displayTime = (time: number) => {

        // only get the seconds left over
        const ms = Math.round(Math.floor((time) % 1000) / 10)

        // allows for smoother transitions
        const displayMS = ms < 10 ? "0" + ms : ms
        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / 1000 / 60) % 60)
        const hours = Math.floor((time / 1000 / 60 / 60) % 24)
        const days = Math.floor((time / 1000 / 60 / 60 / 24))

        // possibly later get the days

        return (
            <>
                <span>{days !== 0 && days + "d "}{hours !== 0 && hours + "h "}{minutes !== 0 && minutes + "m "}{seconds}s {displayMS}</span>
            </>
        )
    }


    return (
        <div>
            <StopWatch
                milliseconds={milliseconds}
                lapTime={lapTime}
                watchStarted={watchStarted}

                handleStart={handleStart}
                handleLap={handleLap}
                handleReset={handleReset}

                displayTime={displayTime}
                displayLaps={displayLaps}
            />
        </div>
    )
}

// To create a stopwatch
// we can either use the date object 
// or we can use setInterval
// Why use the Date object over setInterval?
// -- this is because setInterval is not accurate
// -- when the system lags, Date is universal
