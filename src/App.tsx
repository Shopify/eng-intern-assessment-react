import React, { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Lap from './Lap'
import './styles/main.css'

export default function App() {
  const [timer, setTimer] = useState(0)
  const [counting, setCounting] = useState(false)
  const [laps, setLaps] = useState([])
  const [lapTime, setLapTime] = useState(0)
  const [lapNumber, setLapNumber] = useState(0)

  // update stopwatch time
  useEffect(() => {
    if (counting) {
      const interval = setInterval(() => {
        setTimer((prevCounter) => prevCounter + 1)
        setLapTime((prevCounter) => prevCounter + 1)
      }, 10)
      return () => clearInterval(interval)
    }
  }, [counting])

  // start stopwatch
  const start = () => {
    setCounting(true)
  }

  // stop stopwatch
  const stop = () => {
    setCounting(false)
  }

  // reset all values
  const reset = () => {
    setTimer(0)
    setCounting(false)
    setLaps([])
    setLapNumber(0)
    setLapTime(0)
    setLapTime(0)
  }

  // record the current time as a lap
  const lap = () => {
    setLapNumber(lapNumber + 1)
    setLaps((prevLaps) => [
      ...prevLaps,
      { num: lapNumber, time: timer, lap: lapTime },
    ])
    setLapTime(0)
  }

  return (
    <div className='stop-watch'>
      <StopWatch time={timer} />

      <div className='button-list'>
        <StopWatchButton action={start} text='Start' />
        <StopWatchButton action={stop} text='Stop' />
        <StopWatchButton action={reset} text='Reset' />
        <StopWatchButton action={lap} text='Lap' />
      </div>

      {/* display the laps and lap times */}
      {lapNumber > 0 ? (
        <div className='lap-legend'>
          <p>Lap</p>
          <p>Lap Time</p>
          <p>Total Time</p>
        </div>
      ) : (
        ''
      )}

      {laps.map((data) => (
        <Lap lapNum={data.num} lapTime={data.lap} totalTime={data.time} />
      ))}
    </div>
  )
}
