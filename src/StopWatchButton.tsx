import React from 'react'
import './styles/main.css'

interface button {
  action: () => void
  text: string
}

export default function StopWatchButton(props: button) {
  // a button that activates a stopwatch function
  return (
    <div>
      <button onClick={props.action} className='button'>
        {props.text}
      </button>
    </div>
  )
}
