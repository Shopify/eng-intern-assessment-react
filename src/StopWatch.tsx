import React from 'react'
import StopWatchButton from './StopWatchButton'
import { useState, useEffect } from 'react'

export default function StopWatch() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [laps, setLaps] = useState<String[]>([])

  let interval: NodeJS.Timer | undefined;
  let minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2)
  let seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2)
  let milliseconds = ('0' + ((time / 10) % 100)).slice(-2)

  const start = () => {
    if (isRunning) {
      setIsRunning(false)
    } else if (!isRunning) {
      setIsRunning(true)
    }
  }

  const reset = () => {
    if (!isRunning) {
      setTime(0)
      setLaps([])
    }
  }

  const lap = () => {
    setLaps([...laps, String(minutes + ':' + seconds + ':' + milliseconds)])
  }

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10);
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    };
  }, [isRunning])

  return(
    <div>
      <p>{minutes}:{seconds}:{milliseconds}</p>
      <StopWatchButton start={start} reset={reset} lap={lap} isRunning={isRunning}/>
      {laps != null && laps.length > 0 && (
        <div className="laps-grid">
          {laps.map((lap, i) => <div>lap {i} {lap}</div>)}
        </div>
      )}
    </div>
  )
}