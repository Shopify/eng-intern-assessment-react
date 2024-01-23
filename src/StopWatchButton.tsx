import React from 'react'
import { useState } from 'react'

type Props = {
    setTimeInSeconds: Function
};

export default function StopWatchButton(props:Props) {

    const {setTimeInSeconds} = props;
    const [secondCount, setSecondCount] = useState<number>(0);

    const handleStartButton = () => {
        let second:any = setInterval(() => {
            setTimeInSeconds((previousState:number) =>
                previousState + 1)
        }, 1000);
        setSecondCount(second);
        
    }

    return(
        <div className='control_container'>
            <button onClick={handleStartButton} className='control_button'>Start</button>
            {/* <button onClick={handleStopButton} className='control_button'>Stop</button>
            <button onClick={handleResetButton} className='control_button'>Reset</button> */}
        </div>
    )
}