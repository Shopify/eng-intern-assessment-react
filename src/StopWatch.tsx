import React, {useState, useEffect, useRef} from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const timerRef = useRef(null)
    
    // States
    const [time, setTime] = useState(0) // Time in seconds
    const [lap, setLap] = useState(0) // Lap time in seconds
    const [buttonName, setButtonName] = useState("Pause") // Name of the pause button (Between Pause and Resume)


    // Formats the time "HH:MM:SS"
    function formatTime(number: number) {
        let hours = Math.floor(number/3600)
        let minutes = Math.floor((number%3600)/60)
        let seconds = Math.floor(number%60)

        return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2)
    }

    // Calculates the time and displays it
    function startTime() {
        
        // Stops the creation of multiple timers
        if (timerRef.current !== null) {
            clearInterval(timerRef.current)
        }

        // Starts the timer
        timerRef.current = setInterval( () => {
            // Increments the time
            setTime(prevTime => prevTime + 1)
            setLap(prevLap => prevLap + 1)
            }, 1000)
    }

    // Pauses and Resumes the timer
    function pauseTime() {
    
        if (time !== 0) { // Prevents the timer from pausing when it is not running
            // Pauses the timer
            if (buttonName === "Pause") {
                setButtonName("Resume")
                clearInterval(timerRef.current);
            
            // Resumes the timer
            } else {
                setButtonName("Pause")
                startTime()
            }
        }
        
    }   

    // Resets the timer
    function resetTime() {
        // Stops the timer
        clearInterval(timerRef.current)
        timerRef.current = null

        // Resets the time
        setTime(0)
        setLap(0)

        // Resets the pause button name
        setButtonName("Pause")

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
        if (timerRef.current !== null && buttonName !== "Resume") { // Prevents the timer from creating a lap when it is not running or paused
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
    }


    return(
        <div>
            <h2>StopWatch</h2>
            <h3 id="time">{formatTime(time)}</h3>
            <StopWatchButton name="Start" stopWatchHandler={startTime} />
            <StopWatchButton name={buttonName} stopWatchHandler={pauseTime} />
            <StopWatchButton name="Reset" stopWatchHandler={resetTime} />
            <StopWatchButton name="Lap" stopWatchHandler={lapTime} />
            <ol id="lap-list"></ol>
        </div>
    )
}