import React, { useState, useEffect, useRef } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import './styles/index.css'   

/**
 * Represets a single lap entry
 */
export interface Lap {
    lapTime: number; // Time of the given lap
    totalTime: number; // Time since beginning
}

/**
 * A stopwatch application which renders a stopwatch face, lap data, 
 * and action buttons to start, stop, reset, and record laps
 */
export default function App() {

    const [isRunning, setIsRunning] = useState<boolean>(false) // Boolean running state of the stopwatch
    const [time, setTime] = useState<number>(0) // Stopwatch time in 10s of milliseconds
    const [laps, setLaps] = useState<Lap[]>([]) // Array of lap data
    const [currentLap, setCurrentLap] = useState<Lap | null>(null) // Lap data for current in-progress lap
    const timingIntervalId = useRef(null) // ID of timing interval

    const pause = () => {
        /**
         * Pause the stopwatch
         */
        setIsRunning(false)
    }

    const start = () => {
        /**
         * Start or resume the stopwatch
         */
        setIsRunning(true)
    }

    const reset = () => {
        /**
         * Reset the stopwatch back to its initial state
         */
        setIsRunning(false)
        setTime(0) // reset time to 0
        setLaps([]) // empty lap data
        setCurrentLap(null) // clear current lap time
    }

    const lap = () => {
        /**
         * Save a new lap entry
         */
        const newTime = time // current time
        // time since last lap or current time if first lap
        const newLapTime = laps.length > 0 ? newTime - laps[laps.length - 1].totalTime : newTime
        setLaps([...laps, {totalTime:newTime, lapTime:newLapTime}]) // append new lap data
    }

    useEffect(() => {
        /**
         * Set an interval to increment time every 10 milliseconds when the stopwatch is running
         */
        if (isRunning) {
            timingIntervalId.current = setInterval(() => {
                setTime(time => time + 1);
            }, 10)
        }
        return () => {
            clearInterval(timingIntervalId.current) // Get rid of the interval when complete
        }
    }, [isRunning])

    useEffect(() => {
        /**
         * Update the live data on the current in progress lap whenever stopwatch time updates
         */
        if (laps.length > 0) {
            // live time since beginning
            const newTime = time
            // live time since last lap
            const newLapTime = newTime - laps[laps.length - 1].totalTime
            setCurrentLap({totalTime:newTime, lapTime:newLapTime})
        }
    }, [time])

    return(
        <>
            <GlobalStyle />
            <CenteredContainer>
                <StopWatchContainer>
                    <StopWatch 
                        time={time} 
                        laps={laps}
                        currentLap={currentLap}
                    />
                    <StopWatchButton 
                        isRunning={isRunning}
                        pause={pause}
                        start={start}
                        reset={reset}
                        lap={lap}
                    />
                </StopWatchContainer>
            </CenteredContainer>
        </>
    )
}

const StopWatchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;    
    padding: 20px;
    font-family: Roboto Mono, monospace;
`

const CenteredContainer = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
`

const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
    }
`
