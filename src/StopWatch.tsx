import React from 'react'
import StopWatchButton from './StopWatchButton'

interface StopWatchProps {
    // any props that come into the component
    startHandler : ()=> void
    stopHandler : ()=> void
    lapHandler : ()=> void
    resetHandler : ()=> void
    lapsArray : any[]
    timeToStringFormatter : (value : number)=> string
    currentTime : number
}

export default function StopWatch({
    startHandler,
    stopHandler,
    lapHandler,
    resetHandler,
    timeToStringFormatter,
    lapsArray,
    currentTime
}:StopWatchProps) {

    return(
        <div>
            <StopWatchButton label={'Start'} onClickHandler={startHandler}></StopWatchButton>
            <StopWatchButton label={'Stop'} onClickHandler={stopHandler}></StopWatchButton>

            <div>{timeToStringFormatter(currentTime)}</div>
            <StopWatchButton label={'Lap'} onClickHandler={lapHandler}></StopWatchButton>

            <div>
                {lapsArray.map((lap, index) => (
                     <div key={index}>Lap {index + 1} : {timeToStringFormatter(lap)}</div>
                     ))} 
            </div>
            <StopWatchButton label={'Reset'} onClickHandler={resetHandler}></StopWatchButton>
        </div>
    )
}