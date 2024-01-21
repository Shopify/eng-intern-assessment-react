import React, { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Lap from './Lap'
import './styles/main.css'

export default function App() {
  const [timer, setTimer] = useState(0) // time in one hundredth of a seccond
  const [counting, setCounting] = useState(false) // true when stopwatch is activated
  const [laps, setLaps] = useState([]) // list of all laps
  const [lapNumber, setLapNumber] = useState(0) // number of laps
  const [lapTime, setLapTime] = useState(0) // time per lap

  // update counter time when stopwatch is activated
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

  // record the current time and lap time
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

      {/* stopwatch buttons */}
      <div className='button-list'>
        <StopWatchButton action={start} text='Start' />
        <StopWatchButton action={stop} text='Stop' />
        <StopWatchButton action={reset} text='Reset' />
        <StopWatchButton action={lap} text='Lap' />
      </div>

      {/* display the laps and lap times if laps exist*/}
      {lapNumber > 0 ? (
        <div className='lap-legend' data-testid='lap-display'>
          <p>Lap</p>
          <p>Lap Time</p>
          <p>Total Time</p>
        </div>
      ) : (
        ''
      )}
      <ul>
        {laps.map((data) => (
          <li key={data.lap}>
            <Lap lapNum={data.num} lapTime={data.lap} totalTime={data.time} />
          </li>
        ))}
      </ul>
    </div>
  )
}
