import React, { useState, useEffect } from "react"
import StopWatch from "./StopWatch"
import StopWatchButton from "./StopWatchButton"
import LapTable from "./LapTable"

export default function App() {
  const [timer, setTimer] = useState(0) // total seconds
  const [counting, setCounting] = useState(false)
  const [laps, setLaps] = useState([])
  const [lapTime, setLapTime] = useState(0)
  const [lapNumber, setLapNumber] = useState(1)

  useEffect(() => {
    if (counting) {
      const interval = setInterval(() => {
        console.log("hi")
        setTimer((prevCounter) => prevCounter + 1)
        setLapTime((prevCounter) => prevCounter + 1)
      }, 10)
      return () => clearInterval(interval)
    }
  }, [counting])

  const start = () => {
    setCounting(true)
  }

  const stop = () => {
    setCounting(false)
  }

  const reset = () => {
    setTimer(0)
    setCounting(false)
    setLapNumber(0)
    setLapTime(0)
    setLaps([])
    setLapTime(0)
  }

  const lap = () => {
    setLapNumber(lapNumber + 1)
    setLaps((prevLaps) => [
      ...prevLaps,
      { time: timer, num: lapNumber, lap: lapTime },
    ])
    setLapTime(0)
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <StopWatch time={timer} />
      <StopWatchButton action={start} text="Start" />
      <StopWatchButton action={stop} text="Stop" />
      <StopWatchButton action={reset} text="Reset" />
      <StopWatchButton action={lap} text="Lap" />
      {laps.map((data) => (
        <LapTable lapNum={data.num} time={data.time} lapTime={data.lap} />
      ))}
    </div>
  )
}

interface props {
  time: number
}

export function DisplayTime(props: props) {
  const hours = Math.floor((props.time / 10000) % 60)
  const minutes = Math.floor((props.time / 1000) % 60)
  const seconds = Math.floor((props.time / 100) % 60)
  const hundredth = Math.floor(props.time % 60)

  return (
    <p>
      {hours < 10 ? 0 : ""}
      {hours}:{minutes < 10 ? 0 : ""}
      {minutes}:{seconds < 10 ? 0 : ""}
      {seconds}:{hundredth < 10 ? 0 : ""}
      {hundredth}
    </p>
  )
}
