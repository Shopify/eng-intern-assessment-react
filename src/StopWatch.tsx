import React from 'react';
import './css/App.css';
import { IStopWatchProps } from './type/InterfaceSWT';

export default function StopWatch(props: IStopWatchProps) {
    return (
        <div className='timer-display'>
            <p id="hour">{props.timeDisplay[0]}</p>
            <span>:</span>
            <p id="minute">{props.timeDisplay[1]}</p>
            <span>:</span>
            <p id="second">{props.timeDisplay[2]}</p>
        </div>
    )
}