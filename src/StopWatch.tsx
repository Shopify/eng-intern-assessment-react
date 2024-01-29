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
    isStartPressed
}:StopWatchProps) {

    return(
        <div className='flex-container'>
            <div className='flex-item'>
                <StopWatchButton 
                    isDisabled={isStartPressed?true:false} 
                    className={isStartPressed?'stop-watch-button start disabled':'stop-watch-button start'} 
                    label={'Start'} 
                    onClickHandler={startHandler}
                />
                <StopWatchButton 
                    className={isStartPressed?'stop-watch-button stop' : 'stop-watch-button stop disabled'} 
                    label={'Stop'} 
                    onClickHandler={stopHandler} 
                    isDisabled={isStartPressed?false:true}
                />
            </div>
            <div className='flex-item'>
                <p className='time-display'>{timeToStringFormatter(currentTime)}</p>
            </div>
            <div className='flex-item'>
                <StopWatchButton 
                    className={isStartPressed?'stop-watch-button lap' :'stop-watch-button lap disabled'} 
                    label={'Lap'} 
                    onClickHandler={lapHandler} 
                    isDisabled={isStartPressed?false:true}
                />
                <StopWatchButton 
                    className='stop-watch-button reset' 
                    label={'Reset'} 
                    onClickHandler={resetHandler} 
                    isDisabled={false}
                />
            </div>
            <div className='flex-container'>
                {lapsArray.map((lap, index) => (
                     <div className='flex-item' key={index}>
                        <p className='laps-display'>Lap {index + 1} : {timeToStringFormatter(lap)}</p>
                    </div>
                     ))} 
            </div>
        </div>
    )
}