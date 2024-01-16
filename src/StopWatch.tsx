import React from 'react'
import { Lap } from './App'
import './stopWatch.styles.css'

interface StopWatchProps {
    timeElapsed: number,
    sessionLaps: Lap[],
    children: React.ReactNode
}
export default function StopWatch(props: StopWatchProps) {

    // helper function to convert time value to display string
    const displayTimeString = (timeElapsed: number) => {
        // get unit values
        const minutesElapsed = Math.floor(timeElapsed / 60000);
        const secondsElapsed = Math.floor((timeElapsed % 60000) / 1000);
        const centiSecondsElapsed = Math.floor((timeElapsed % 1000) / 10);

        // convert number to string
        const stringMinutes = minutesElapsed.toString();
        const stringSeconds = secondsElapsed.toString();
        const stringCentiSeconds = centiSecondsElapsed.toString();

        // combined the values for formatted string display
        return `${stringMinutes.padStart(2, '0')}:${stringSeconds.padStart(2, '0')}.${stringCentiSeconds.padStart(2, '0')}`;
    }

    return (
        <div className="stopwatch-container" data-testid="stopwatch-container">
            {/* render header with display time */}
            <div className="header-display" data-testid="stopwatch-header">
                Stopwatch
            </div>
            <div className="time-display-container">
                <div className="time-display" data-testid="stopwatch-time-display">
                    {displayTimeString(props.timeElapsed)}
                </div>
            </div>
            {/* render child buttons */}
            {props.children}
            {/* render the laps table */}
            {props.sessionLaps.length > 0 && <div className="laps-table-container" data-testid="laps-table-container">
                <table className="laps-table">
                    <thead>
                    <tr>
                        <th>Lap #</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* inspired by Apple's stop watch, we want to display laps in reverse order */}
                    {props.sessionLaps.slice().reverse().map((lap) => {
                        return (
                            <tr key={lap.id} data-testid={`lap-${lap.id}`}>
                                <td>Lap {lap.id}</td>
                                <td data-testid={`laptime-${lap.id}`}>{displayTimeString(lap.lapTime)}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>}
        </div>
    );
}