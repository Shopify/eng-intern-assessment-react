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
            setCurrentTime(new Date().valueOf() - startTime.valueOf())
        }, 1000)}
        return()=>{
            clearInterval(intervalId)
        }
        }
    ,[isStartPressed])
    

    function onClickStart(){
        setIsStartPressed(true)
    }

    function onClickStop(){
        setIsStartPressed(false)
    }

    return(
        <div>
            <button onClick={() => onClickStart()}>Start</button>
            <button onClick={() => onClickStop()}>Stop</button>
            <div>{currentTime}</div>
        </div>
    )
}