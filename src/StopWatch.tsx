import React from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    
    // Variables for the time
    let sec = 0
    let min = 0
    let hour = 0

    // String variables for the time
    let sec_str: string
    let min_str: string
    let hour_str: string

    // Variables for the lap time
    let sec_lap = 0
    let min_lap = 0
    let hour_lap = 0

    // String variables for the lap time
    let sec_lap_str: string
    let min_lap_str: string
    let hour_lap_str: string

    // Variables for the timer
    let time: any
    let timer: any

    // Calculates the time and displays it
    function startTime() {
       // Clears the timer if it is already running
        if (timer !== null) {
            clearInterval(timer)
        }
        
        // Starts the timer
        timer = setInterval( () => {
            // Increments the time
            sec++
            if(sec == 60) {
                sec = 0
                min++
            }
            if(min == 60) {
                min = 0
                hour++
            }

            // Increments the lap time
            sec_lap++
            if(sec_lap == 60) {
                sec_lap = 0
                min_lap++
            }
            if(min_lap == 60) {
                min_lap = 0
                hour_lap++
            }
            
            // Adds a 0 to the front of the number if it is less than 10
            if (sec <= 9) {
                sec_str = "0" + sec
            }
            if (min <= 9) {
                min_str = "0" + min
            }
            if (hour <= 9) {
                hour_str = "0" + hour
            }

            // Displays the time
            time = document.getElementById("time")
            time.innerHTML = hour_str + ":" + min_str + ":" + sec_str
        }, 1000)
    }

    // Stops the timer
    function stopTime() {
        clearInterval(timer)
    }

    // Resets the timer
    function resetTime() {
        // Stops the timer
        clearInterval(timer)

        // Resets the time
        sec = 0
        min = 0
        hour = 0
        
        //Displays the reseted time
        time = document.getElementById("time")
        time.innerHTML = "00:00:00"

        // Removes all the laps
        let lapList = document.getElementById("lapList")
        while (lapList.firstChild) {
            lapList.removeChild(lapList.firstChild)
        }
    }
    
    // Displays the lap time
    function lapTime() {
        // Creates list item
        let lapList = document.getElementById("lapList")
        let lap = document.createElement("li")
        
        // Adds a 0 to the front of the number if it is less than 10
        if (sec_lap <= 9) {
            sec_lap_str = "0" + sec_lap
        }
        if (min_lap <= 9) {
            min_lap_str = "0" + min_lap
        }
        if (hour_lap <= 9) {
            hour_lap_str = "0" + hour_lap
        }
        
        // Displays the lap time
        let currentLap = hour_lap_str + ":" + min_lap_str + ":" + sec_lap_str
        let currentTime = hour_str + ":" + min_str + ":" + sec_str
        lap.innerHTML = "Lap: " + currentLap + "   " + "Total: " + currentTime
        
        // Resets the lap time
        hour_lap = 0
        min_lap = 0
        sec_lap = 0
        
        // Adds the lap to the list
        lapList.appendChild(lap)
        
    }


    return(
        <div>
            <h2>StopWatch</h2>
            <h3 id="time">00:00:00</h3>
            <StopWatchButton name="Start" stopWatchHandler={startTime} />
            <StopWatchButton name="Stop" stopWatchHandler={stopTime} />
            <StopWatchButton name="Reset" stopWatchHandler={resetTime} />
            <StopWatchButton name="Lap" stopWatchHandler={lapTime} />
            <ol id="lapList"></ol>
        </div>
    )
}