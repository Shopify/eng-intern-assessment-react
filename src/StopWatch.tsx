import React from 'react'
import { DisplayTime } from './Utils'
import './styles/main.css'

interface time {
  time: number
}

export default function StopWatch(props: time) {
  // displays the current stopwatch time
  return (
    <div>
      <p>Stopwatch</p>
      <h1 className='clock' data-testid='clock'>
        <DisplayTime time={props.time} />
      </h1>
    </div>
  )
}
