import React from 'react';
import './Style.css'

export default function StopWatchButton(props: any) {
    return (
        <div className='buttons'>
            {props.status ? (
                //if clock is running, display these buttons
                <div id='runningButtons'>
                    <button onClick={() => props.onStatusChange(false)}>Stop</button>
                    <button onClick={props.onLap}>Lap</button>
                </div>
            ) : (
                //if clock is paused, display these buttons
                <div id='stoppedButtons'>
                    <button onClick={() => props.onStatusChange(true)}>Start</button>
                    <button onClick = {props.onReset}>Reset</button>
                </div>
            )}
        </div>
    );
}
