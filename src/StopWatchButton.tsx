import React,{useState} from 'react'
import './StopWatchButton.css'
type Props = {
    setTimeInSec: Function
};

export default function StopWatchButton(props:Props) {
    const {setTimeInSec} = props;
    const [intervalId, setIntervalId] = useState<number>(0);
    
    const handlePlayButton = () => {
        let interval:any = setInterval(() => {
            setTimeInSec((previousState:number) => (previousState + 1))
        },1000);

        setIntervalId(interval);
    }

    const handleStopButton = () => {
       clearInterval(intervalId);
    }

    const handleResetButton = () => {
        clearInterval(intervalId);
        setTimeInSec(0);
    }
    
    return(
        <section className='buttons-container'>
            <button onClick={handlePlayButton}>Play</button>
            <button onClick={handleStopButton}>Stop</button>
            <button onClick={handleResetButton}>Reset</button>
        </section>
    )
}