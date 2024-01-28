import React from 'react';
import { Lap } from './App';
import './StopWatch.css';

interface StopWatchProps {
    laps: Lap[],
    isRunning: boolean,
    time: number,
}

export const breakdownTime = (time: number) => {
    const ms = time % 1000;
    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / 1000 / 60) % 60;
    const hours = Math.floor(time / 1000 / 60 / 60);

    return {
        ms,
        seconds,
        minutes,
        hours,
    }
}

export const formatTime = (time: number) => {
    const { ms, seconds, minutes, hours } = breakdownTime(time);

    const msString = ms.toString().padStart(3, '0');
    const secondsString = seconds.toString().padStart(2, '0');
    const minutesString = minutes.toString().padStart(2, '0');
    const hoursString = hours.toString().padStart(2, '0');

    return `${hoursString}:${minutesString}:${secondsString}:${msString}`;
}

export interface LapListProps {
    laps: Lap[],
    time: number,
}

export interface LapDisplayProps {
    faster?: boolean, // true for faster, false for slower, undefined for neither (first lap)
    lap: Lap,
    id: number,
}

export function LapDisplay (props: LapDisplayProps) {
    return(
        <li
            data-testid={`lap-${props.id}`}
            className={props.faster ? 'faster' : props.faster === false ? 'slower' : ''}
        >
            Lap {props.id} {formatTime(props.lap.duration)}
        </li>
    )
}

export function LapList(props: LapListProps) {

    // This is the lap that is currently being timed
    const previewLap: Lap = {
        duration: props.time - (props.laps.length > 0 ? props.laps[props.laps.length - 1].startTime : 0),
        startTime: props.time,
    }

    return(
        <ul>
            {props.laps.map((lap, index) => (
                <LapDisplay 
                    key={index}
                    lap={lap}
                    id={index + 1}
                    faster={index === 0 ? undefined : lap.duration < props.laps[index - 1].duration}
                />
            ))}
            <LapDisplay
                lap={previewLap}
                id={props.laps.length + 1}
                faster={props.laps.length === 0 ? undefined : props.time < props.laps[props.laps.length - 1].duration}
            />
        </ul>
    )
}

export default function StopWatch(props: StopWatchProps) {
    return(
        <div data-testid="stopwatch" className="stopwatch">
            <LapList
                data-testid="laplist"
                laps={props.laps}
                time={props.time}
            />
            <h1 data-testid="stopwatch-display">
                {formatTime(props.time)}
            </h1>
        </div>
    )
}