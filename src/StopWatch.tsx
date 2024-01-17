import React from 'react';
import { convertToTime } from './Helper';
import "./styles.css";

// props for StopWatch Component
interface IProps {
    time: number;
}

// Stop watch
export default function StopWatch({
    time
} : IProps) {
    const readableTime = convertToTime(time);
    return(
        <div className='StopWatchContainer'>
            <div className='StopWatchTimeContainer'>
                <div className='IndividualTimeContainer'>
                    <div className='IndividualTime'>{readableTime.hours < 10 ? "0" + readableTime.hours : readableTime.hours}</div>
                    <div className='IndividualTimeLabel'>Hours</div>
                </div>
                <div className='IndividualTimeContainer'>
                    <div className='IndividualTime'>{readableTime.minutes < 10 ? "0" + readableTime.minutes : readableTime.minutes}</div>
                    <div className='IndividualTimeLabel'>Minutes</div>
                </div>
                <div className='IndividualTimeContainer'>
                    <div className='IndividualTime'>{readableTime.seconds < 10 ? "0" + readableTime.seconds : readableTime.seconds}</div>
                    <div className='IndividualTimeLabel'>Seconds</div>
                </div>
            </div>
        </div>
    )
}