import React, { useEffect, useState } from 'react'

export default function App() {
    const [startTime, setStartTime] = useState(new Date())
    const [currentTime, setCurrentTime] = useState(0)
    const [isStartPressed, setIsStartPressed] = useState(false)
    var intervalId: NodeJS.Timer

    useEffect(()=>{
        if(isStartPressed){
        //every 1000 miliseconds (i.e every second), calculate the elapsed time until interval is cleared
        intervalId = setInterval(()=>{
            setCurrentTime(currentTime + 1)
            console.log(currentTime)
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
        <div>
            <button onClick={() => onClickStart()}>Start</button>
            <button onClick={() => onClickStop()}>Stop</button>
            <div>{secondsMinutesHours(currentTime)}</div>
        </div>
    )
}