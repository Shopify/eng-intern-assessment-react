import React, {useState} from 'react'
import './StopWatchButtons.css';



//define props for stopwatchbutton function
type Props ={
    setTimeinSeconds: Function
    addLap: Function
    resetLap: Function
};

export default function StopWatchButton(props:Props) {
    const {setTimeinSeconds} = props;
    const {addLap} = props;
    const {resetLap} =props;
    const [intervalId,setIntervalId] = useState<number>(0);
    //starts the stopwatch only if interval ID is 0. 
    const handleStartButton = () =>{
        if (intervalId!=0) return;
        let interval:any = setInterval(() => {
            setTimeinSeconds((previousState: number) => previousState+1);
        }, 1000)
        setIntervalId(interval);
    }
    //Stops or pauses the stopwatch and resets interval ID to 0
    const handleStopButton =() => {
        clearInterval(intervalId);
        setIntervalId(0);

    }
    //resets the stopwatch. Resets interval ID to 0. Resets the Laps array
    const handleResetButton =() => {
        clearInterval(intervalId);
       setTimeinSeconds(0);
        resetLap();
        setIntervalId(0);

    }
    //add lap and corresponding time to array
    const handleLapButton=() =>{
        addLap();

    }
    return(
        <div className='buttons'>
            <button onClick={handleStartButton}>Start</button>
            <button onClick={handleStopButton}>Stop</button>
            <button onClick={handleResetButton}>Reset</button>
            <button onClick={handleLapButton}>Lap</button>

        </div>
    )
}