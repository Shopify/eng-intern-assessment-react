import React, { useState } from "react"
import { calculateTimer } from "./StopWatch"

// Define the type for the component props
type Props = {
  setTimeInSeconds: Function
  timeInSeconds: number
}

// Main component for the stopwatch controls (start, stop, reset, record)
export default function StopWatchButton({
  setTimeInSeconds,
  timeInSeconds,
}: Props) {
  // State to manage the interval ID for the running stopwatch
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>()
  // State to store lap times in HH:MM:SS format
  const [lapTimes, setLapTimes] = useState<string[][]>([])

  // Function to handle the Start button click
  const handleStartButton = () => {
    // Start an interval to update the timeInSeconds every second
    let interval = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1)
    }, 1000)
    // Save the interval ID in the state
    setIntervalId(interval)
  }

  // Function to handle the Stop button click
  const handleStopButton = () => {
    // Clear the interval using the saved interval ID
    clearInterval(intervalId)
  }

  // Function to handle the Reset button click
  const handleResetButton = () => {
    // Clear the interval and reset the timeInSeconds
    clearInterval(intervalId)
    setTimeInSeconds(0)
  }

  // Function to handle the Record button click
  const handleRecordButton = () => {
    // Record the current lap time in lapTimes state
    setLapTimes((prevLapTimes) => [
      ...prevLapTimes,
      calculateTimer(timeInSeconds),
    ])
  }

  // Render the controls and lap times
  return (
    <div>
      <div className="controls-container">
        <button onClick={handleStartButton}>Start</button>
        <button onClick={handleStopButton}>Stop</button>
        <button onClick={handleResetButton}>Reset</button>
        <button onClick={handleRecordButton}>Record</button>
      </div>

      {lapTimes.length > 0 && (
        <div className="lap-times-container">
          <h3>Lap Times:</h3>
          <ul>
            {/* Display lap times if there are recorded laps */}
            {lapTimes.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {lapTime[0]}:{lapTime[1]}:{lapTime[2]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
