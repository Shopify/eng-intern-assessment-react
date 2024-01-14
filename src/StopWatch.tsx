import React, { useState, useEffect } from 'react'
import { Button } from '@shopify/polaris';
import moment from 'moment';
import LapTimesList from './LapTimesList';


export default function StopWatch() {

  // Timer function

  const [ time, setTime ] = useState(0)
  const [ isTimerActive, setIsTimerActive ] = useState(false)

  useEffect(() => {
    if (isTimerActive) {
      setTimeout(() => {
        setTime(time + 1)
        // console.log(time)
      }, 0);
    }
  }, [ time, isTimerActive ])

  // Start button click(starts timer -> turns into pause/resume once started)
  const handleStartClick = () => {
    setIsTimerActive(true)
  }


  // Stop button click(stop timer -> when stopped, lap can't be pressed but restart can be pressed)
  const handleStopClick = () => {
    setIsTimerActive(false)

  }

  // Lap button click(records time but timer keeps going)

  const [ lapTimes, setLapTimes ] = useState([])

  const handleLapClick = () => {
    setLapTimes((prevLapTimes) => [ ...prevLapTimes, time ])
    console.log("Lap Button Click: ", lapTimes)
  }



  // Restart button click (restarts timer -> shows up when timer is stopped)
  const handleRestartClick = () => {
    setTime(0)
    setLapTimes([])
    setIsTimerActive(false)
  }


  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{ moment(time).format("mm:ss:SS") }</p>
      <div className='stopwatchBtns' >
        { !isTimerActive ? <Button onClick={ handleStartClick }>Start</Button> : <Button onClick={ handleStopClick }>Stop</Button> }
        { !isTimerActive ? <Button onClick={ handleRestartClick } disabled={ isTimerActive } >Restart</Button> : <Button onClick={ handleLapClick }>Lap</Button> }
      </div>
      <LapTimesList lapTimes={ lapTimes } setLapTimes={ setLapTimes } />

    </div>
  )
}

