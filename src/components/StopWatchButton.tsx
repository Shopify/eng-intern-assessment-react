import React, {useState, useEffect} from 'react'
import {Dispatch, SetStateAction} from 'react'

interface StopWatchState {
    formattedTime: string
    time: number
    setTime: Dispatch<SetStateAction<number>>
}

/**
 * Function for start/stop, reset and lap buttons
 *
 * @param formattedTime Properly formatted time
 * @param time raw unconverted time
 * @param setTime setState for updating the time
 * @constructor
 */
export default function StopWatchButton({
                                            formattedTime,
                                            time, setTime,
                                        }: StopWatchState): React.JSX.Element {

    //state management for updating start/stop state
    const [isRunning, setIsRunning] = useState<boolean>(false);
    //state management for storing laps
    const [laps, setLaps] = useState<string[]>([]);

    //Function for starting and stopping the stopwatch
    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    //Function for resetting the stopwatch
    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }
    //Function for recording laps
    const handleLaps = () => {
        setLaps([...laps, formattedTime])
    }

    useEffect(() => {
        let interval: any
        if (isRunning) {
            interval = setInterval(() => {
                setTime(time + 1);
            }, 10);
        }
        return () => clearInterval(interval)
    }, [time, isRunning])

    return (
        <>
            <div style={{width: '480px', display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={handleStartStop}>{isRunning ? "Stop" : 'Start'}</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleLaps}>Lap</button>
            </div>
            <div style={{marginTop: '50px', overflow: 'scroll', height: '500px', width: '480px'}}>
                {laps.map((lap: string, index: number) => {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '7px',
                        }}>
                            <div key={index}>Lap {index + 1}:</div>
                            <div>{lap}</div>
                        </div>)
                })}
            </div>
        </>
    )
}