import React from 'react';
import { IStopWatchButtonProps } from './Types/IStopWatchButtonProps';
import './css/App.css';

export default function StopWatchButton(props: IStopWatchButtonProps) {

    // Stopwatch button with label of type and onClick fn from props
    return (
        <div className='stopwatch-controls-container'>
            <button onClick={props.onClick}>
                {props.type}
            </button>
        </div>
    )
}
