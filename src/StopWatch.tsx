import React from 'react'

interface StopwatchProps {
    currentTime: number
    totalTime: number
    lapTimes: number[]
    totalTimes: number[]
}

export default function StopWatch({
    currentTime,
    totalTime,
    lapTimes,
    totalTimes} : StopwatchProps) {

      // Math.floor rounds down to the nearest integer (i.e. 1.9 = 1)
    const seconds = Math.floor(currentTime % 60) //current number of seconds
    const totalSeconds = Math.floor(totalTime % 60) //total number of seconds

    const minutes = Math.floor((currentTime % 3600)/60) //current number of minutes
    const totalMinutes = Math.floor((totalTime % 3600)/60) //total number of minutes

    const hours = Math.floor(currentTime / 3600) //current number of minutes
    const totalHours = Math.floor(totalTime / 3600) //total number of minutes

    return(
        <div>
            <h2>{hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}</h2>
            <h2>{totalHours.toString().padStart(2, "0")}:
            {totalMinutes.toString().padStart(2, "0")}:
            {totalSeconds.toString().padStart(2, "0")}</h2>
            <ul>
                {lapTimes.map((lap, index) => (
                    <li key={index}>
                        Lap {" " + (index + 1)}
                        {(Math.floor(lap / 3600)).toString().padStart(2, "0")}:
                        {(Math.floor((lap % 3600)/60)).toString().padStart(2, "0")}:
                        {(Math.floor(lap % 60)).toString().padStart(2, "0")}
                    </li>
                ))}
            </ul>
            <ul>
                {totalTimes.map((time, index) => (
                    <li key={index}>
                        Lap {" " + (index + 1)}
                        {(Math.floor(time / 3600)).toString().padStart(2, "0")}:
                        {(Math.floor((time % 3600)/60)).toString().padStart(2, "0")}:
                        {(Math.floor(time % 60)).toString().padStart(2, "0")}
                    </li>
                ))}
            </ul>
        </div>
    )
}