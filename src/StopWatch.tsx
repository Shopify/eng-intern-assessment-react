import React, {useEffect, useState} from 'react'
// import "./StopWatch.css"
import calculateDisplayTime from "./Functions/calculateDisplayTime";
import StopWatchButton from "./StopWatchButton";
export default function StopWatch() {
    const [timeInSec,setTimeInSec]= useState<number>(0);
    const [timer,setTimer] = useState<Array<string>>([]);
    const [lapArray,setLapArray] = useState([]);


    useEffect(()=>{
       setTimer(calculateDisplayTime(timeInSec));
    },[timeInSec])

    return(
        <div>
            <div className="time">
                <p className="display-text">{timer[0]}</p>
                <p>:</p>
                <p className="display-text">{timer[1]}</p>
                <p>:</p>
                <p className="display-text">{timer[2]}</p>
            </div>
            <StopWatchButton setTimeInSec = {setTimeInSec} timeInSec={timeInSec}/>

        </div>
    )
}
