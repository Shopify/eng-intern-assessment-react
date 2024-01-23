import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {

    const [time, setTime] = React.useState(0)
    const [timerOn, setTimerOn] = React.useState(false)
    const [laps, setLaps] = useState<number[]>([])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if(timerOn) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)

            console.log(laps)
        }else if(!timerOn && interval) {
            clearInterval(interval)
        }

        return () => clearInterval(interval!)
    }, [timerOn]);


    /*
    This function handles the start/stop button
        If the timerOn is true, the timerOn should be set to false
        If the timerOn is false, the timerOn should be set to true
    */
    const handleStartStop = () => {
        setTimerOn(!timerOn) 
        console.log(timerOn)
    }

    /*
    This function handles the lap button
        it should add the current time to the laps array
    */
    const handleLap = () => {
        setLaps([...laps, time])
        console.log('Lap = ' + time/1000)
        console.log(laps)
        setTime(0)
        
    }

    /*
    This function handles the reset button
        it resets all values to their initial values
    */
    const handleReset = () => {
        setTimerOn(false)
        setTime(0)
        setLaps([])
        console.log('Reset')
    }

    return(
        <div>
            <h1>Stopwatch</h1>
            {(time/1000).toFixed(2)}
            <div id='buttons'>
                <StopWatchButton onClick={handleStartStop} displayText={timerOn ? 'Stop' : 'Start'}/>
                <StopWatchButton onClick={handleLap} displayText='Lap'/>
                <StopWatchButton onClick={handleReset} displayText='Reset'/>
            </div>

            <div id='lapsList'>
                {/*Display the laps here*/}
                {laps.length > 0 && (
                    <ul>
                        {laps.map((lap, index) => {
                            return <li key={index}>Lap {index + 1} - {(lap/1000).toFixed(2)}</li>
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}