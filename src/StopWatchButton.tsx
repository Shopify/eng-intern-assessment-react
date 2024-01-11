import React from 'react'
import { IStopWatchButtonProps } from './Types/IStopWatchButtonProps';
import './css/App.css'


export default function StopWatchButton(props: IStopWatchButtonProps) {
    return (
        <div className='stopwatch-controls-container'>
            <button onClick={props.onClick}>
                {props.type}
            </button>
        </div>
    )
}