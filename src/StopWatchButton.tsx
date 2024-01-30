import React, { useState } from 'react'


// Maximum number of laps that can be recorded
const maxLaps = 25;


type Props = { 
    setTime: Function 
}
  export default function StopWatchButton(props:Props) {

    const {setTime} = props;
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


    }

    const handleResetButton = () => {
        clearInterval(intervalId);
        setTime(0);
        }



    return (
        <div className='stopwatchbutton-container'>
            <button onClick={handleStartButton}>Start</button>
            <button onClick={handleStopButton}>Stop</button>
            <button>Laps</button>
            <button onClick={handleResetButton}>Reset</button>
        </div>
    )
  }
    
    
