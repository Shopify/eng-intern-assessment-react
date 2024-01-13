import React, {useState} from 'react'
import StopWatchButton from './StopWatchButton'
import { format } from 'path'

export default function StopWatch() {
    
    // // Variables for the time
    // let sec = 0
    // let min = 0
    // let hour = 0

    // // String variables for the time
    // let sec_str: string
    // let min_str: string
    // let hour_str: string

    // // Variables for the lap time
    // let sec_lap = 0
    // let min_lap = 0
    // let hour_lap = 0

    // // String variables for the lap time
    // let sec_lap_str: string
    // let min_lap_str: string
    // let hour_lap_str: string

    // // Variables for the timer
    let clock: any
    let timer: any

    const [time, setTime] = useState(0)
    const [lap, setLap] = useState(0)
    const [buttonName, setButtonName] = useState("Pause")


    function formatTime(number: number) {
        let hours = Math.floor(number/3600)
        let minutes = Math.floor((number%3600)/60)
        let seconds = Math.floor(number%60)

        return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
    }

    // Calculates the time and displays it
    function startTime() {
       // Clears the timer if it is already running
        if (timer !== null) {
            clearInterval(timer)
        }
        
        // Starts the timer
        timer = setInterval( () => {
            // Increments the time
            setTime((prevTime) => prevTime + 1)
            setLap((prevLap) => prevLap + 1)

            // Displays the time
            clock = document.getElementById("time")
            clock.innerHTML = formatTime(time)
        }, 1000)
    }

    // Pauses and Resumes the timer
    function pauseTime() {
        
        if (buttonName === "Pause") {
            setButtonName("Resume")
            clearInterval(timer);
        } else {
            setButtonName("Pause")
            clearInterval(timer)
            startTime()
        }
        
    }   

    // Resets the timer
    function resetTime() {
        // Stops the timer
        clearInterval(timer)

        // Resets the time
        setTime(0)
        setLap(0)
        
        //Displays the reseted time
        clock = document.getElementById("time")
        clock.innerHTML = "00:00:00"

        // Removes all the laps
        let lapList = document.getElementById("lap-list")
        if (lapList.childElementCount > 0) {
            while (lapList.firstChild) {
                lapList.removeChild(lapList.firstChild)
            }
        }
    }
    
    // Displays the lap time
    function lapTime() {
        // Creates list item
        let lapList = document.getElementById("lap-list")
        let lapElement = document.createElement("li")

        // Displays the lap time
        let currentLap =  formatTime(lap)
        let currentTime = formatTime(time)
        lapElement.innerHTML = "Lap: " + currentLap + "   " + "Total: " + currentTime
        
        // Resets the lap time
        setLap(0)
        
        // Adds the lap to the list
        lapList.appendChild(lapElement)
    }



    return(
        <div>
            <h2>StopWatch</h2>
            <h3 id="time">{formatTime(time)}</h3>
            <StopWatchButton name="Start" stopWatchHandler={startTime} />
            <StopWatchButton id="pause" name={buttonName} stopWatchHandler={pauseTime} />
            <StopWatchButton name="Reset" stopWatchHandler={resetTime} />
            <StopWatchButton name="Lap" stopWatchHandler={lapTime} />
            <ol id="lap-list"></ol>
        </div>
    )
}