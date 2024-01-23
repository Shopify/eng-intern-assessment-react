import React, { useState } from 'react'
import '../styles/StopWatchButton.css'
import calculateTime from './helpers/calculateTime';

interface Lap {
  id: number;
  time: string;
}

type StopWatchButtonProps = {
  setTimeInSeconds: Function,
  timeInSeconds: number,
  setTimerOn: Function
};

export default function StopWatchButton(props:StopWatchButtonProps) {
  const { setTimeInSeconds, timeInSeconds, setTimerOn } = props;
  const [laps, setLaps] = useState<Lap[]>([]);
  
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
    if (timeInSeconds > 0) {
      const lapTime = calculateTime(timeInSeconds);
      setLaps((prevLap) => [
        ...prevLap, {id: laps.length + 1, time: `${lapTime.minutesFormatted}:${lapTime.secondsFormatted}:${lapTime.millisecondsFormatted}` }
      ]);
    }
  };
  
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