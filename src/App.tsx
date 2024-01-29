import React, { useEffect, useState } from 'react'
import StopWatch from './StopWatch'

export default function App() {
    const [currentTime, setCurrentTime] = useState(0)
    const [isStartPressed, setIsStartPressed] = useState(false)
    const [laps, setLaps] = useState([])
    const [prevLap, setPrevLap] = useState(0)
    var intervalId: NodeJS.Timer

    useEffect(()=>{
        if(isStartPressed){
        //every 1000 miliseconds (i.e every second), calculate the elapsed time until interval is cleared
        intervalId = setInterval(()=>{
            setCurrentTime(currentTime + 1)
        }, 1000)}
        return()=>{
            clearInterval(intervalId)
        }
        }
    ,[isStartPressed, currentTime])
    

    function onClickStart(){
        setIsStartPressed(true)
    }

    function onClickStop(){
        setIsStartPressed(false)
    }

    function onClickReset(){
        setCurrentTime(0)
        setIsStartPressed(false)
        setPrevLap(0)
        setLaps([])
    }

    function onClickLap(){
       var lapTime = currentTime - prevLap
       setLaps([lapTime, ...laps])
       setPrevLap(lapTime)
    }

    function secondsMinutesHours(value: number){
        //calculate hours
        const hours = Math.trunc(value/(60*60))

        //calculate minutes
        const minutes = Math.trunc((value - hours*60*60)/60)

        //calculate seconds
        const seconds = Math.trunc(value - hours*60*60 - minutes*60)

        return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
    }

    return(
    <StopWatch 
    startHandler={onClickStart}
    stopHandler={onClickStop} 
    lapHandler={onClickLap} 
    resetHandler={onClickReset} 
    lapsArray={laps} 
    timeToStringFormatter={secondsMinutesHours} 
    currentTime={currentTime}/>
    )
}