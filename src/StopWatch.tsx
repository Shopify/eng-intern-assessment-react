import React from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    
    let sec = 0
    let min = 0
    let hour = 0

    let sec_str: string
    let min_str: string
    let hour_str: string
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

    
            hour_str = hour.toString()
            min_str = min.toString()
            sec_str = sec.toString()
        
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


    return(
        <div id="StopWatch">
            <h2>StopWatch</h2>
            <h3 id="time">00:00:00</h3>
            <StopWatchButton name="Start" stopWatchHandler={startTime} />
        </div>
    )
}