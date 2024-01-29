import React from 'react'
import StopWatchButton from './StopWatchButton'
import './StopWatch.css'

interface StopWatchProps {
    // any props that come into the component
    startHandler : ()=> void
    stopHandler : ()=> void
    lapHandler : ()=> void
    resetHandler : ()=> void
    lapsArray : any[]
    timeToStringFormatter : (value : number)=> string
    currentTime : number
    isDisabled : boolean
    isStartPressed : boolean
}

export default function StopWatch({
    startHandler,
    stopHandler,
    lapHandler,
    resetHandler,
    timeToStringFormatter,
    lapsArray,
    currentTime,
    isDisabled,
    isStartPressed
}:StopWatchProps) {

    return(
        <div className='flex-container'>
            <div className='flex-item'>
            <StopWatchButton isDisabled={isStartPressed?true:false} className={isStartPressed?'start disabled':'start'} label={'Start'} onClickHandler={startHandler}></StopWatchButton>
            <StopWatchButton className={isStartPressed?'stop' : 'stop disabled'} label={'Stop'} onClickHandler={stopHandler} isDisabled={isStartPressed?false:true}></StopWatchButton>
            </div>

            <div className='flex-item'>
                <p className='time-display'>{timeToStringFormatter(currentTime)}</p>
            </div>

            <div className='flex-item'>
                <StopWatchButton className={isStartPressed?'lap' :'lap disabled'} label={'Lap'} onClickHandler={lapHandler} isDisabled={isStartPressed?false:true}></StopWatchButton>
                <StopWatchButton className='reset' label={'Reset'} onClickHandler={resetHandler} isDisabled={false}></StopWatchButton>
            </div>

            <div className='flex-container'>
                {lapsArray.map((lap, index) => (
                     <div className='flex-item' key={index}><p className='laps-display'>Lap {index + 1} : {timeToStringFormatter(lap)}</p></div>
                     ))} 
            </div>

        </div>
    )
}