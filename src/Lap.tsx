import React from 'react'
import { DisplayTime } from './Utils'
import './styles/main.css'

interface lap {
  lapNum: number
  totalTime: number
  lapTime: number
}

export default function Lap(props: lap) {
  // display a row in the lap table containing the lap number, lap time and total time
  return (
    <div className='lap' data-testid='lap-table'>
      <p className='lap-num'>{props.lapNum}</p>
      <p>
        <DisplayTime time={props.lapTime} />
      </p>
      <p data-testid='total-time'>
        <DisplayTime time={props.totalTime} />
      </p>
    </div>
  )
}
