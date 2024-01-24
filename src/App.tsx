import React from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import Laps from './Laps';
import { useState } from 'react';


export default function App() {

    //useStates for timer, lap number, lap time, and start
    const [start, setStart] = useState(false);
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState([]);
    const [lapNumber, setlapNumber] = useState(1);

    //Setting functions for buttons
    function setTimerStart():void{
        setStart(true);
    }
    function setTimerStop():void{
        setStart(false);
    }
    function setTimerReset():void{
        //Reset timer and laps
        setTime(0);
        setLaps([]);
        setlapNumber(1);
    }
    function setLap():void{
        //Add lap number and time to array
        setlapNumber(lapNumber+1);
        setLaps((laps)=>[...laps, {
            lapNum: lapNumber,
            lapTime: time
        }]);
    }

    return(
        <div>
            <StopWatch start={start} time={time} setTime={setTime}></StopWatch>
            <StopWatchButton
            setStart={setTimerStart} setStop={setTimerStop} setReset={setTimerReset} setLap={setLap} start={start}
            ></StopWatchButton>
            <Laps laps={laps}></Laps>

        </div>
    )
}