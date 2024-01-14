import React, { useState, useEffect } from 'react'
import { Button } from '@shopify/polaris';
import moment from 'moment';



export default function StopWatch () {

  // Timer function

  const [ time, setTime ] = useState(0)
  const [ isTimerActive, setIsTimerActive ] = useState(false)


  // const hours = time + Math.floor(((1000 * 60 * 60 * 24)) );
  // const minutes = time + Math.floor(((1000 * 60 * 60)) );
  // const seconds = time + Math.floor(((1000 * 60)));

  useEffect(() => {
    console.log("TIME: ", time)
    console.log("ISTIMERACTIVE: ", isTimerActive)

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
    console.log("Stop btn: ", time)

  }

  // Lap button click(records time but timer keeps going)
  const handleLapClick = () => {

  }


  // Restart button click (restarts timer -> shows up when timer is stopped)
  const handleRestartClick = () => {
    setIsTimerActive(false)
    setTime(0)
  }



  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{ moment(time).format("mm:ss:SS") }</p>
      <div className='stopwatchBtns' >
        <Button onClick={ handleStartClick }>Start</Button>
        <Button onClick={ handleStopClick }>Stop</Button>
        <Button onClick={ handleLapClick }>Lap</Button>
        <Button onClick={ handleRestartClick }>Restart</Button>
      </div>
    </div>
  )
}