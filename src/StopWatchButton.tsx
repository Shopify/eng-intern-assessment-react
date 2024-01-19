import React from 'react'

export default function StopWatchButton(props: {setCounting: boolean}) {

    function startTimer(){
    }

    function stopTimer(){

    }

    function callLap(){

    }

    return(
        <div>
            <button onClick={startTimer}> Start! </button>
            <button onClick={stopTimer}> Stop! </button>
            <button onClick={callLap}> Lap </button>
        </div>
    )
}