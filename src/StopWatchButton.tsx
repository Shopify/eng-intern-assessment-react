import React, { MouseEventHandler } from 'react'
import { MouseEvent } from 'react'

export default function StopWatchButton({ handleStart, handleStop, handleReset, handleLap } : 
    { handleStart: MouseEventHandler<HTMLButtonElement>, 
      handleStop: MouseEventHandler<HTMLButtonElement>, 
      handleReset: MouseEventHandler<HTMLButtonElement>, 
      handleLap: MouseEventHandler<HTMLButtonElement>
    }) {
        return(
            <div>
                <button onClick={handleStart}>start</button>
				<button onClick={handleStop}>stop</button>
				<button onClick={handleReset}>reset</button>
                <button onClick={handleLap}>lap</button>
            </div>
        )
}