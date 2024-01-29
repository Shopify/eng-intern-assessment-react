import React, { useState } from 'react'

export default function App() {
    const [startTime, setStartTime] = useState(new Date())
    const [currentTime, setCurrentTime] = useState(startTime)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [isStartPressed, setIsStartPressed] = useState(false)
    //console.log(startTime)
    var intervalId: NodeJS.Timer

    function updateTime(){
        setTimeout(() => {
            clearInterval(intervalId);
          }, 3000);
        //setElapsedTime(1)
        //every 1000 miliseconds (i.e every second), calculate the elapsed time until interval is cleared
        intervalId = setInterval(()=>{
            setElapsedTime(new Date().valueOf() - startTime.valueOf())
            console.log(new Date().valueOf())
            console.log(startTime.valueOf())
            console.log(new Date().valueOf() - startTime.valueOf())
            console.log(elapsedTime)
        }, 1000)
    }

    function onClickStart(){
        //setIsStartPressed(true)
        updateTime()
        //setCurrentTime(new Date())
        //console.log(currentTime)
    }

    function onClickStop(){
        //setIsStartPressed(false)
        //setCurrentTime(new Date())
        //console.log(currentTime)
        //clear interval here
        clearInterval(intervalId)
        console.log(elapsedTime)
    }

    return(
        <div>
            <button onClick={() => onClickStart()}>Start</button>
            <button onClick={() => onClickStop()}>Stop</button>
        </div>
    )
}