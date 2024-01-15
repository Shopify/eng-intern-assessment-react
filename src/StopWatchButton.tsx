import React from 'react'
import { Button, ButtonGroup } from '@shopify/polaris';
import { PlayCircleMajor, PauseMajor, ReplayMinor, AddNoteMajor } from '@shopify/polaris-icons';

interface StopWatchButtonProps {

  setTime: Function,
  isTimerActive: boolean,
  setIsTimerActive: Function,
  lapTimes: Array<number>,
  setLapTimes: Function,
  lap: number,
  setLap: Function,

}

export default function StopWatchButton(StopWatchButtonObject: StopWatchButtonProps) {
  const { setTime, isTimerActive, setIsTimerActive, lapTimes, setLapTimes, lap, setLap } = StopWatchButtonObject

  const handleStartClick = () => {
    setIsTimerActive(true)
  }

  const handleStopClick = () => {
    setIsTimerActive(false)
  }

  const handleLapClick = () => {
    setLapTimes((prevLapTimes: Array<number>) => [ ...prevLapTimes, lap ])
    setLap(0)
  }

  const handleResetClick = () => {
    setTime(0)
    setLapTimes([])
    setIsTimerActive(false)
  }

  return (
    <div style={ { paddingBottom: "2rem" } }>
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
    </div>
  )
}