import React, { useState } from 'react'


// Maximum number of laps that can be recorded
const maxLaps = 25;


type Props = { 
    time: number;
    setTime: Function;
    setNumberOfLaps: Function;
    setLaps: Function;
    laps: Array<number>;
}
  export default function StopWatchButton(props:Props) {

    const { time, setTime, setNumberOfLaps, setLaps } = props;
    const [intervalId, setIntervalId]=useState<number>(0);


    const handleStartButton = (e: object) => {
        let interval:any = setInterval(() => {
            setTime((prev:number) => prev + 1);
        }, 10);

        setIntervalId(interval);
    }

  

    const handleStopButton = () => {
        clearInterval(intervalId);

    }

    const handleLapsButton = () => {
        setLaps((prevLaps: any) => [...prevLaps, time]);
        setNumberOfLaps((prevLaps: number) => prevLaps + 1);
    }

    const handleResetButton = () => {
        clearInterval(intervalId);
        setTime(0);
        setNumberOfLaps(0);
        }



    return (
        <div className='stopwatchbutton-container'>
            <button onClick={handleStartButton}>Start</button>
            <button onClick={handleStopButton}>Stop</button>
            <button onClick={handleLapsButton}>Laps</button>
            <button onClick={handleResetButton}>Reset</button>
        </div>
    )
  }
    
    
