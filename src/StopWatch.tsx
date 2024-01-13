import React from 'react';
import './css/App.css';
import { IStopWatchProps } from './Types/IStopWatchTypes';
import StopWatchButton from './StopWatchButton';

export default function StopWatch(props: IStopWatchProps) {

    // Stopwatch Display with hours, minutes, seconds buttons, and lap list
    return (
        <div className='stopwatch-container'>
            <div className='timer-display'>
                <p id="hour">{props.timeDisplay[0]}</p>
                <span>:</span>
                <p id="minute">{props.timeDisplay[1]}</p>
                <span>:</span>
                <p id="second">{props.timeDisplay[2]}</p>
            </div>
            <div className='stopwatch-button-container'>
                <StopWatchButton type={'Start'} onClick={props.start} />
                <StopWatchButton type={'Stop'} onClick={props.stop} />
                <StopWatchButton type={'Reset'} onClick={props.reset} />
                <StopWatchButton type={'Lap'} onClick={props.lap} />
            </div>
            <div>
                <ul>
                    {props.laps.map((lap, index, array) => (
                        <li key={index} style={{ listStyle: 'None', color: 'whitesmoke' }}>
                            {index > 0 ? (`Lap ${index}: ${lap - array[index - 1]} seconds`) : ''}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
