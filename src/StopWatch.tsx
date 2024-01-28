import React from 'react';
import { Lap } from './App';
import './StopWatch.css';
import { formatTime } from './util';

/**
 * Props for the LapList component
 * @param laps the list of laps to display
 * @param time the current time in milliseconds
 */
export interface LapListProps {
    laps: Lap[],
    time: number,
}

/**
 * Props for the LapDisplay component
 * @param faster true if the lap is faster than the previous lap, false if it is slower, undefined if it is the first lap
 * @param lap the lap to display
 * @param id the lap number
 */
export interface LapDisplayProps {
    faster?: boolean,
    lap: Lap,
    id: number,
}

/**
 * Props for the StopWatch component
 * @param laps the list of laps to display
 * @param time the current time in milliseconds
 */
interface StopWatchProps {
    laps: Lap[],
    time: number,
}

/**
 * A component that displays a single lap as a list item
 * Provides a class name of 'faster' or 'slower' if the lap is faster or slower than the previous lap respectively or no class name if it is the first lap
 * @param props LapDisplayProps
 * @returns an li element that displays the lap
 */
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

/**
 * A component that displays a list of all the recorded laps
 * @param props LapListProps
 * @returns a ul element that contains all the laps as LapDisplays
 */
export function LapList(props: LapListProps) {
    // This is the lap that is currently being timed
    const previewLap: Lap = {
        duration: props.time - (props.laps.length > 0 ? props.laps[props.laps.length - 1].endTime : 0),
        endTime: props.time,
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

/**
 * A component that displays the stopwatch consisting of the LapList and the time counter without any buttons
 * For buttons see the StopWatchButton component
 * @param props StopWatchProps
 * @returns a div element that contains the LapList and the time counter
 */
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