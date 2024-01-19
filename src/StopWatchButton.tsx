import React, { useState, useEffect } from 'react'
import '../styles/StopWatchButton.css'
import calculateTime from './helpers/calculateTime';

type Props = {
  setTimeInSeconds: Function,
  timeInSeconds: number
};

export default function StopWatchButton(props:Props) {
  const { setTimeInSeconds, timeInSeconds } = props;
  const [intervalId, setIntervalId] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [laps, setLaps] = useState<Array<any>>([]);

  useEffect(() => {
    let timerInterval:any = null;

    if (timerOn) {
      timerInterval = setInterval(() => {
        setTimeInSeconds((prevState:number) => prevState + 10)
      }, 10);
    } else {
      clearInterval(intervalId)
      setIntervalId(0);
    }

    return () => clearInterval(timerInterval)

  }, [timerOn])

  const handlePlayButton = () => {
    setTimerOn(true);
  }

  const handleStopButton = () => {
    setTimerOn(false);
  }

  const handleResetButton = () => {
    setTimerOn(false);
    setLaps([]);
    setTimeInSeconds(0);
  }

  const handleLapButton = () => {
    const lapTime = calculateTime(timeInSeconds);
    setLaps((prevLap) => [...prevLap, {id: laps.length + 1, time: lapTime }])
  }
    return(
        <div className="controls">
          <button onClick={handlePlayButton}>Start</button>
          <button onClick={handleStopButton}>Stop</button>
          <button onClick={handleResetButton}>Reset</button>
          <button onClick={handleLapButton}>Lap</button>
          <ul>
          {laps.map((lap) => (
          <li key={lap.id}>{`Lap ${lap.id}: ${lap.time}`}</li>
            ))}
          </ul>
        </div>
    )
}