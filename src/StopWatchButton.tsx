import React from 'react';
import './Style.css'

export default function StopWatchButton(props: any) {
    return (
        <div className='buttons'>
            {props.status ? (
                <div className='running_buttons'>
                    <button onClick={() => props.onStatusChange(false)}>Stop</button>
                    <button onClick={() => props.onLap}>Lap</button>
                </div>
            ) : (
                <div className='stopped_buttons'>
                    <button onClick={() => props.onStatusChange(true)}>Start</button>
                    <button onClick = {props.onReset}>Reset</button>
                </div>
            )}
        </div>
    );
}
