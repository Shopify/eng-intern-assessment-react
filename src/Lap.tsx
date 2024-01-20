import React from 'react'
import { DisplayTime } from './Utils'
import './styles/main.css'

interface lap {
  lapNum: number
  totalTime: number
  lapTime: number
}

export default function Lap(props: lap) {
  // display an entry in the lap table
  return (
    <div className='lap'>
      <p className='lap-num'>{props.lapNum}</p>
      <p>
        <DisplayTime time={props.lapTime} />
      </p>
      <p>
        <DisplayTime time={props.totalTime} />
      </p>
    </div>
  )
}
