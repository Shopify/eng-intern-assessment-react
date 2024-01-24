import React, { useEffect, useState } from 'react'
import StopWatchButton from './StopWatchButton'
import '../styles/StopWatch.css'

export default function StopWatch() {

    const [time, setTime] = React.useState(0)
    const [timerOn, setTimerOn] = React.useState(false)
    const [laps, setLaps] = useState<number[]>([])

    // This useEffect hook will run every time the timerOn value changes
    useEffect(() => {
        // initialize interval to null
        let interval: NodeJS.Timeout | null = null

        // Check if the timer is on
        if(timerOn) {
            // If the timer is on, start an interval that increments the time by 10 milliseconds
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        }else if(!timerOn && interval) {
            // if the timer is not on and the interval is not null, clear the interval
            clearInterval(interval)
        }

        // return a function that clears the interval when the component unmounts or before the effect runs again
        return () => clearInterval(interval!)
    }, [timerOn]);


    /*
    This function handles the start/stop button
        If the timerOn is true, the timerOn should be set to false
        If the timerOn is false, the timerOn should be set to true
    */
    const handleStartStop = () => {
        setTimerOn(!timerOn) 
    }

    /*
    This function handles the lap button
        it should add the current time to the laps array
    */
    const handleLap = () => {
        setLaps([...laps, time])
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
    }

    /*
    This function formats the time in the format m:ss:ms
    */
    const formatTime = (time: number) => {
        // Get minutes, seconds, and milliseconds
        let minutes = Math.floor(time / 60000)
        let seconds = Math.floor((time / 1000) % 60)
        let milliseconds = Math.floor((time % 1000) / 10)

        // Convert numbers to strings and pad with leading zeros
        let minutesStr = String(minutes);
        let secondsStr = String(seconds).padStart(2, '0');
        let millisecondsStr = String(milliseconds).padStart(2, '0');

        // If minutes is 0, only show seconds and milliseconds
        if(minutes === 0) {
            return `${secondsStr}.${millisecondsStr}`;
        }

        return `${minutesStr}:${secondsStr}.${millisecondsStr}`;
    }

    return(
        <div className='stopwatch'>
            <div className='timer'>
                {formatTime(time)}
            </div>
            
            <div className='buttons'>
                <StopWatchButton onClick={handleStartStop} displayText={timerOn ? 'Stop' : 'Start'} buttonType={timerOn ? 'stop' : 'start'}/>
                <StopWatchButton onClick={timerOn ? handleLap : handleReset} displayText={timerOn ? 'Lap' : 'Reset'} buttonType={timerOn ? 'lap' : 'reset'}/>
            </div>

            <div className='laps-list-container'>
                <table className='laps-list'>
                    <tbody>
                        {laps.map((lap, index) => (
                            <tr key={index}>
                                <td>Lap {index + 1}</td>
                                <td className='lap-time'>{formatTime(lap)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}