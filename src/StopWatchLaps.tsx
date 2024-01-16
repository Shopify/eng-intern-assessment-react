import React from 'react'
import { convertToTime } from './Helper';
import './styles.css'

// Interface for StopWatchButtonConfig
interface IProps {
    laps: number[];
    currentLapTime: number;
    stopped: boolean;
}

// Contains Start, Stop, Reset, Lap Buttons
export default function StopWatchLaps({
    laps,
    currentLapTime,
    stopped,
} : IProps) {

    // Helper Container to format lap component
    const LapsContainer = (time : number, lapNumber : number) => {
        let readableTime = convertToTime(time);
        return (
            <div key={"LapID#" + lapNumber} className='IndividualLapContainer'>
                <div>{"Lap " + lapNumber}</div>
                <div className='IndividualLapTimeContainer'>
                    <div>{readableTime.hours < 10 ? "0" + readableTime.hours : readableTime.hours}:</div>
                    <div>{readableTime.minutes < 10 ? "0" + readableTime.minutes : readableTime.minutes}:</div>
                    <div>{readableTime.seconds < 10 ? "0" + readableTime.seconds : readableTime.seconds}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='LapsContainer'>
            {(!stopped || laps.length > 0) && LapsContainer(currentLapTime, laps.length + 1)}
            <hr />
            {[...laps].reverse().map((lapTime: number, index: number) => 
                LapsContainer(lapTime, laps.length - index)
            )}
        </div>
    )
}