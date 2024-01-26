import React, { useEffect, useState } from "react"
import "./App"
import StopWatchButton from "./StopWatchButton"

// Function to calculate the timer in HH:MM:SS format based on total seconds
export function calculateTimer(timeSeconds: number) {
  // Calculate hours, minutes, and seconds
  let hours = Math.floor(timeSeconds / 3600)
  let minutes = Math.floor((timeSeconds - hours * 3600) / 60)
  let seconds = timeSeconds - hours * 3600 - minutes * 60

  // Format hours, minutes, and seconds with leading zeros if needed
  let hoursFormat = hours < 10 ? `0${hours}` : hours.toString()
  let minutesFormat = minutes < 10 ? `0${minutes}` : minutes.toString()
  let secondsFormat = seconds < 10 ? `0${seconds}` : seconds.toString()

  // Return an array with formatted hours, minutes, and seconds
  return [hoursFormat, minutesFormat, secondsFormat]
}

// Main component for the stopwatch
export default function StopWatch() {
  // State to store the total time in seconds and the formatted timer array
  const [timeInSeconds, setTimeInSeconds] = useState(0)
  const [timerArray, setTimerArray] = useState<string[]>([])

  // Effect to update the timerArray whenever timeInSeconds changes
  useEffect(() => {
    let timeArray = calculateTimer(timeInSeconds)
    setTimerArray(timeArray)
  }, [timeInSeconds])

  // Render the stopwatch with formatted hours, minutes, and seconds
  return (
    <main className="main">
      <section className="time-container">
        <p className="timer-text">{timerArray[0]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[1]}</p>
        <span>:</span>
        <p className="timer-text">{timerArray[2]}</p>
      </section>
      <StopWatchButton
        timeInSeconds={timeInSeconds}
        setTimeInSeconds={setTimeInSeconds}
      />
    </main>
  )
}
