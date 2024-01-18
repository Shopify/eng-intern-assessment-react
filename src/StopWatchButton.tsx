import React, { useState, useEffect } from 'react'
import '../styles/StopWatchButton.css'

type Props = {
  setTimeInSeconds: Function
};

export default function StopWatchButton(props:Props) {
  const { setTimeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  useEffect(() => {
    let interval:any = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimeInSeconds((prevState:number) => prevState + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)

  }, [timerOn])

  const handlePlayButton = () => {
    setTimerOn(true);
  }

  const handleStopButton = () => {
    setTimerOn(false);
  }

  const handleResumeButton = () => {
    setTimerOn(true);
  }

  const handleLapButton = () => {

  }
    return(
        <div className="controls">
          <button onClick={handlePlayButton}>Start</button>
          <button onClick={handleStopButton}>Stop</button>
          <button onClick={handleResumeButton}>Resume</button>
          <button onClick={handleLapButton}>Lap</button>
        </div>
    )
}