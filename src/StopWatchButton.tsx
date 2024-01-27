import React, {useState} from 'react'
import './StopWatchButtons.css';




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
    const handleStartButton = () =>{
        if (intervalId!=0) return;
        let interval:any = setInterval(() => {
            setTimeinSeconds((previousState: number) => previousState+1);
        }, 1000)
        setIntervalId(interval);
    }
    const handleStopButton =() => {
        clearInterval(intervalId);
        setIntervalId(0);

    }
    const handleResetButton =() => {
        clearInterval(intervalId);
       setTimeinSeconds(0);
        resetLap();
        setIntervalId(0);

    }
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