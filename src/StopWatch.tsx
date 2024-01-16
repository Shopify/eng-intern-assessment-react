import React, { useState } from 'react'
import StopWatchButton from './StopWatchButton'

// UTILITY FUNCTIONS
/**
 * Displays the time in the format: 00d 00h 00m 00s 00
 * @param time - time in milliseconds
 * @param shrinkMS - whether to shrink the milliseconds (reduces rendering lag)
 * @returns React.JSX.Element
 */
const displayTime = (time: number, shrinkMS?: boolean) => {

    // only get the milliseconds left over
    const ms = Math.round(Math.floor((time) % 1000) / 10)

    // allows for smoother transitions from 99 to 0
    const displayMS = ms < 10 ? "0" + ms : ms

    // convert time to seconds, minutes, hours, and days
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor((time / 1000 / 60 / 60) % 24)
    const days = Math.floor((time / 1000 / 60 / 60 / 24))

    // {/* Only display the time if it is not 0 */ }
    return (
        <span>{days !== 0 && days + "d "}{hours !== 0 && hours + "h "
        } {minutes !== 0 && minutes + "m "} {seconds}s <span className={shrinkMS ? "milliseconds" : ""}>{displayMS}</span></span >
    )
}


export default function StopWatch() {
    /*
     * States
     */

    // time displayed on the main timer and lap timer in milliseconds
    const [mainTime, setMainTime] = useState<number>(0)
    const [lapTime, setLapTime] = useState<number>(0)

    // determines whether the watch is currently counting
    const [watchStarted, setWatchStarted] = useState<boolean>(false)

    // holds the lap times in an array of [lapTime, mainTime]
    // mainTime is the total time when the lap was clicked
    // lapTime is the time it took to complete the lap
    const [laps, setLaps] = useState<number[][]>([])

    // holds the interval ID for the main timer and the lap timer
    const [intervalID, setIntervalID] = useState<ReturnType<typeof setInterval> | null>(null)
    const [lapIntervalID, setLapIntervalID] = useState<ReturnType<typeof setInterval> | null>(null)

    /*
     * Functions
     */

    /**
     * Handles the start and stop of the watch
     * Runs when the start/stop button is clicked
     * @returns void
     */
    const handleStart = (): void => {
        // if watch has not started yet, then handle starting the watch
        if (!watchStarted) {
            // if we have don't have a previous time, then set the current date as
            // the start time. Otherwise, set the start time to the previous time
            const start = mainTime === 0 ? Date.now() : Date.now() - mainTime

            // increment the main time every 10 milliseconds
            setIntervalID(setInterval(() => {
                setMainTime(Date.now() - start)
            }, 20))

            // if we have a previous lap time, start the lap timer from that time
            // this allows us to pause and start the lap timer along with the main timer
            if (lapTime !== 0) {
                const lapStart = Date.now() - lapTime
                setLapIntervalID(setInterval(() => {
                    setLapTime(Date.now() - lapStart)
                }, 10))
            }

        } else {
            // If the watch is currently counting, then handle stopping the watch

            // stop main timer
            clearInterval(intervalID)

            // stop lap timer
            clearInterval(lapIntervalID)
        }

        // toggle turning on / off the watch
        setWatchStarted((prev) => !prev);
    }

    /**
     * Starts the lap timer and adds the current time to the laps array.
     * Resets the lap timer back to 0 every new lap.
     * Runs when the lap button is clicked.
     * @returns void
     */
    const handleLap = (): void => {

        // clear the previous lap interval (if there is one)
        clearInterval(lapIntervalID)

        // start the lap timer from 0
        const start = Date.now()

        // increment the lap time every 10 milliseconds
        setLapIntervalID(setInterval(() => {
            setLapTime(Date.now() - start)
        }, 10))

        // add the laps as an array of [lapTime, mainTime]
        // mainTime is the total time when the lap was clicked
        // lapTime is the time it took to complete the lap
        setLaps((prev) => [lapTime ? [lapTime, mainTime] : [mainTime, mainTime], ...prev])


    }

    /**
     * Resets the main timer, lap timer, and laps array.
     * @returns void
     */
    const handleReset = (): void => {
        // reset the main time and lap time
        setMainTime(0)
        setLapTime(0)

        // clear the intervals
        clearInterval(intervalID)
        clearInterval(lapIntervalID)

        // clear the laps
        setLaps([])

        // stop the watch
        setWatchStarted(false)
    }

    /**
     * Handles the keyboard shortcuts
     * @param e - key event
     * @returns void
     */
    const handleKeyPress = (e: React.KeyboardEvent) => {
        // prevent the default behavior of the spacebar
        e.preventDefault()

        // if the spacebar is pressed, then start / stop the watch
        if (e.key === " ") {
            handleStart()
        }

        // if the L key is pressed, then lap the watch
        if (e.key === "l" && watchStarted) {
            handleLap()
        }

        // if the R key is pressed, then reset the watch
        if (e.key === "r" && mainTime !== 0 && !watchStarted) {
            handleReset()
        }
    }

    /*
     * Display Functions
     */

    /**
     * Displays the laps in a list
     * @returns React.JSX.Element
     */
    const displayLaps = () => {
        return (
            <>
                {laps.map((lap, index) => {
                    return (
                        <tr className="lap-items" key={`${lap} + ${index}`}>
                            <td>#{laps.length - (index)}</td>
                            <td>{displayTime(lap[0])}</td>
                            <td>{displayTime(lap[1])}</td>
                        </tr>
                    )
                })}
            </>
        )
    }

    return (
        <div onKeyUp={handleKeyPress} className="stopwatch-container">
            <div className="timers-container">
                {/* display the main time */}
                <h1 className="main-timer">{displayTime(mainTime, true)}</h1>

                {/* only display the lap time if we started a lap */}
                <div className="lap-timer">{lapTime !== 0 && <span data-testid="lap-timer">{displayTime(lapTime)}</span>}</div>
            </div>

            <div className="buttons-container">
                {/* start / stop button */}
                <StopWatchButton
                    text={!watchStarted ? "Start" : "Stop"}
                    handleClick={handleStart}
                />

                {/* You can only lap when the watch is currently counting */}
                <StopWatchButton
                    text="Lap"
                    disabled={!watchStarted}
                    handleClick={handleLap}
                />

                {/* You can only reset when timer started and paused */}
                <StopWatchButton
                    text="Reset"
                    disabled={mainTime === 0 || watchStarted}
                    handleClick={handleReset}
                />
            </div>

            <div className="laps-container">
                {/* Only display the lap list if there are laps */}
                {laps.length !== 0 &&
                    <table data-testid="lap-list" className="laps-inner-container">
                        <tr>
                            <th>Lap</th>
                            <th>Time</th>
                            <th>Total Time</th>
                        </tr>
                        {displayLaps()}
                    </table>
                }
            </div>
        </div>
    )
}
