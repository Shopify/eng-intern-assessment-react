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

  //Whenever the timer is on, set the interval.
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
    setLaps((prevLap) => [...prevLap, {id: laps.length + 1, time: `${lapTime[0]}:${lapTime[1]}:${lapTime[2]}` }])
  }
    return(
        <div className="controls">
          <button title="start" className="start" onClick={handlePlayButton}>Start</button>
          <button title="stop" className="stop" onClick={handleStopButton}>Stop</button>
          <button title="reset" className="reset" onClick={handleResetButton}>Reset</button>
          <button title="lap" className="lapButton" onClick={handleLapButton}>Lap</button>
          <section className="lap-container">
            <div>
              {laps.map((lap) => (
              <div className="lap" key={lap.id}>{`Lap ${lap.id} ➡️ ${lap.time}`}</div>
              ))}
            </div>
          </section>
        </div>
    )
}