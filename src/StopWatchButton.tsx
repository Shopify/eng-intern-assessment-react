import React from 'react'
import { Button, ButtonGroup } from '@shopify/polaris';
import { PlayCircleMajor, PauseMajor, ReplayMinor, AddNoteMajor } from '@shopify/polaris-icons';

interface LapTimesListProps {
  time: number,
  setTime: Function,
  isTimerActive: boolean,
  setIsTimerActive: Function,
  lapTimes: Array<number>,
  setLapTimes: Function,
  lap: number,
  setLap: Function

}

export default function StopWatchButton(LapTimesListObject: LapTimesListProps) {
  const { time, setTime, isTimerActive, setIsTimerActive, lapTimes, setLapTimes, lap, setLap } = LapTimesListObject

  // Start button click(starts timer -> turns into pause/resume once started)
  const handleStartClick = () => {
    setIsTimerActive(true)
  }

  // Stop button click(stop timer -> when stopped, lap can't be pressed but restart can be pressed)
  const handleStopClick = () => {
    setIsTimerActive(false)

  }

  // Lap button click(records time but timer keeps going)
  const handleLapClick = () => {
    setLapTimes((prevLapTimes: Array<number>) => [ ...prevLapTimes, lap ])
    setLap(0)

  }


  // Restart button click (restarts timer -> shows up when timer is stopped)
  const handleResetClick = () => {
    setTime(0)
    setLapTimes([])
    setIsTimerActive(false)

  }

  return (
    <ButtonGroup>
      { !isTimerActive
        ?
        <Button size="large" icon={ PlayCircleMajor } variant="primary" tone="success" onClick={ handleStartClick }>Start</Button>
        : <Button size="large" icon={ PauseMajor } variant="primary" onClick={ handleStopClick }>Stop</Button>
      }
      {
        !isTimerActive
          ? <Button size="large" icon={ ReplayMinor } onClick={ handleResetClick } disabled={ isTimerActive } >Reset</Button>
          : <Button size="large" icon={ AddNoteMajor } onClick={ handleLapClick }>Lap</Button>
      }
    </ButtonGroup >
  )
}