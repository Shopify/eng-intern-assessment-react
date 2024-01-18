import React from 'react'
import '../styles/StopWatchButton.css'

type Props = {
  setTimeInSeconds: Function
};

export default function StopWatchButton(props:Props) {
    return(
        <div className="controls">
          <button>Start</button>
          <button>Stop</button>
          <button>Resume</button>
          <button>Lap</button>
        </div>
    )
}