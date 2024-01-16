import React from 'react'
import './css/StopWatch.css'
export default function StopWatchButton(props:any) {
    return(
        <div>
             <div className="StopWatchButton">
                <div className='ControlButton'>
                    {props.active ?
                    <div className='PauseButton' onClick={props.pauseTimer}>Pause</div>:
                    <div className='StartButton' onClick={props.startTimer}>Start</div>}
                    </div>
                <div className='ResetButton' onClick={props.clearTimer}>Reset</div>
                <div className='LapButton' onClick={props.lapTimer}>Lap</div>
            </div>
        </div>
    )
}