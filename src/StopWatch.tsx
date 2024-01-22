import React from 'react'
import { StopWatchContext } from './StopWatchContext'

export default function StopWatch() {
    const data = React.useContext(StopWatchContext);

    return (
        <div>
            {/* the timer */}
            <h2>{fmtTime(data.endtime - data.starttime)}</h2>
            {/* the laps, which are only visible if there is at least 1 */}
            <table style={{ visibility: data.laps.length == 0 ? 'hidden' : 'visible' }}>
                <thead>
                    <tr>
                        <th colSpan={3}>Laps</th>
                    </tr>
                    <tr>
                        <th>Lap #</th>
                        <th>Lap Time</th>
                        <th>Total Time Elapsed</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // all the laps
                        data.laps.map((lap, idx) => {
                            return <tr key={idx}>
                                <th>{idx + 1}</th>
                                <th>{fmtTime(lap.laptime)}</th>
                                <th>{fmtTime(lap.totaltime)}</th>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

// takes number time as input and returns a string of formatted time
function fmtTime(time: number): string {
    let millis = Math.floor((time % 1000) / 10); // get millis then remove the last digit so that we are left with a 2 digit number
    let seconds = Math.floor(time / 1000) % 60;
    let minutes = Math.floor(time / (60 * 1000)) % 60;
    return `${padNmbr(minutes)}:${padNmbr(seconds)}.${padNmbr(millis)}`;
}

// pad an integer with leading zeroes such that it has 2 digits always
function padNmbr(n: number): string {
    return n.toString().padStart(2, '0');
}
