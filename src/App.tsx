import React, { useState, useEffect, useRef } from 'react'


export default function App() {
    const [milliseconds, setMilliseconds] = useState(0)
    const [watchStarted, setWatchStarted] = useState(false)

    // stores numbers in ms
    const [laps, setLaps] = useState<number[]>([])

    const intervalID = useRef<ReturnType<typeof setInterval> | null>(null);

    const handleStart = () => {
        // if watch has not started yet, then start it
        if (!watchStarted) {
            // if we have dont' have a previous time, then set the current date as
            // the start time. Otherwise, we need to set the start time to the previous time
            const start = milliseconds === 0 ? Date.now() : Date.now() - milliseconds

            intervalID.current = setInterval(() => {
                setMilliseconds(Date.now() - start)
            }, 10)
        } else {

            // if watch has started, then stop it
            clearInterval(intervalID.current)
        }

        setWatchStarted(!watchStarted)
    }

    const handleLap = () => {
        // add the current time to the laps array
        setLaps((prev) => [...prev, milliseconds])
    }
    const handleReset = () => {
        // reset the milliseconds
        setMilliseconds(0)

        // clear the interval
        clearInterval(intervalID.current)

        // clear the laps
        setLaps([])

        // stop the watch
        setWatchStarted(false)
    }

    const displayTime = (time: number) => {
        // convert time to milliseconds
        // convert milliseconds to seconds
        // convert seconds to minutes
        // convert minutes to hours
        // convert hours to days

        // only get the seconds left over
        const ms = Math.round(Math.floor((time) % 1000) / 10)

        // allows for smoother transitions
        const displayMS = ms < 10 ? "0" + ms : ms
        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / 1000 / 60) % 60)
        const hours = Math.floor((time / 1000 / 60 / 60) % 24)

        // possibly later get the days

        return (
            <>
                <div>{hours !== 0 && hours + "h "}{minutes !== 0 && minutes + "m "}{seconds}s {displayMS}</div>
            </>
        )
    }

    const displayLaps = () => {
        return (
            <>
                {laps.map((lap, index) => {
                    return (
                        <li key={index}>{displayTime(lap)}</li>
                    )
                })}
            </>
        )
    }


    return (
        <div>
            <div>{displayTime(milliseconds)}</div>

            <button onClick={handleStart}>{!watchStarted ? "Start" : "Stop"}</button>

            {/* You can only lap when the watch is currently counting */}
            <button onClick={handleLap} disabled={milliseconds === 0 || !watchStarted}>Lap</button>

            {/* You can only reset when the started and paused */}
            <button onClick={handleReset} disabled={milliseconds === 0 || watchStarted}>Reset</button>

            {/* Display the laps */}
            <ul>
                {displayLaps()}
            </ul>

        </div>
    )
}

// To create a stopwatch
// we can either use the date object 
// or we can use setInterval
// Why use the Date object over setInterval?
// -- this is because setInterval is not accurate
// -- when the system lags, Date is universal
