import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
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
 * Renders the stopwatch face, lap data, and action buttons
 */
export default function App() {

    const [isRunning, setIsRunning] = useState<boolean>(false) // Running state of the stopwatch
    const [time, setTime] = useState<number>(0) // Stopwatch time in 10s of milliseconds
    const [laps, setLaps] = useState<Lap[]>([]) // Array of lap data
    const [currentLap, setCurrentLap] = useState<Lap | null>(null) // Lap data for current in progress lap
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
        setTime(0)
        setLaps([])
        setCurrentLap(null)
    }

    const lap = () => {
        /**
         * Save a new lap entry
         */
        const newTime = time
        const newLapTime = laps.length > 0 ? newTime - laps[laps.length - 1].totalTime : newTime
        setLaps([...laps, {totalTime:newTime, lapTime:newLapTime}])
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
         * Update the data on the current in progress lap whenever stopwatch time updates
         */
        if (laps.length > 0) {
            const newTime = time
            const newLapTime = newTime - laps[laps.length - 1].totalTime
            setCurrentLap({totalTime:newTime, lapTime:newLapTime})
        }
    }, [time])

    return(
        <CenteredContainer>
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
        </CenteredContainer>
    )
}

const CenteredContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    font-family: Roboto Mono, monospace;
`