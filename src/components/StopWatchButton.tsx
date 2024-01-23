import React from 'react'
import {Dispatch, SetStateAction} from 'react'

interface StopWatchState {
    formattedTime: string
    laps: string[]
    setLaps: Dispatch<SetStateAction<string[]>>
    time: number
    setTime: Dispatch<SetStateAction<number>>
    isRunning: boolean
    setIsRunning: (value: boolean) => void;
}

export default function StopWatchButton({
                                            formattedTime,
                                            laps, setLaps,
                                            time, setTime,
                                            isRunning, setIsRunning
                                        }: StopWatchState) {

    const handleStartStop = () => {
        /*Function for starting and stopping the stopwatch*/
        setIsRunning(!isRunning)
    }
    const handleReset = () => {
        /*Function for resetting the stopwatch*/
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }
    const handleLaps = () => {
        /*Function for recording laps*/
        setLaps([...laps, formattedTime])
    }

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