import React, { MouseEventHandler } from 'react'
import { MouseEvent } from 'react'

export default function StopWatchButton({ handleStart, handleStop, handleReset, handleLap } : 
    { handleStart: MouseEventHandler<HTMLButtonElement>, 
      handleStop: MouseEventHandler<HTMLButtonElement>, 
      handleReset: MouseEventHandler<HTMLButtonElement>, 
      handleLap: MouseEventHandler<HTMLButtonElement>
    }) {
        return(
            <div id='timeButtons'>
                <button className='timeButton' onClick={handleStart}>start</button>
				<button className='timeButton' onClick={handleStop}>stop</button>
				<button className='timeButton' onClick={handleReset}>reset</button>
                <button className='timeButton' onClick={handleLap}>lap</button>
            </div>
        )
}