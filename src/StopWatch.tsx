import React from 'react';

// style sheet
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    globalTimer: {
        fontSize: '40px',
        margin: '0px'
    },
    lapEntry: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    lapFont: {
        fontSize: '20px'
    }
}

// lap type definition
type Lap = {
    number: number;
    duration: number;
}

/*
A separate component that represents the stopwatch display

--Parameters--
time: time in milliseconds
laps: laps array, each entry contains lap number and duration
*/
export default function StopWatch({time, laps} : {time: number, laps: Lap[]}) {
    // pads left digit with a zero when the value is a single digit
    const padTwoDigits = (value: number) => {
        return value.toString().padStart(2,'0');
    }

    // converts time in 10 millisecond intervals to minutes in integers
    const toMinutes = (time: number) => {
        return padTwoDigits(Math.floor(time/6000)); // allows for minutes to exceed 2 digits
    }

    // converts time in 10 millisecond intervals to seconds in integers
    const toSeconds = (time: number) => {
        return padTwoDigits(Math.floor(time/100) % 60); // always < 60 seconds
    }

    // converts time in 10 millisecond intervals to milliseconds in integers
    const toMilliseconds = (time: number) => {
        return padTwoDigits(Math.floor(time) % 100); // always < 100 milliseconds
    }

    // formats time in 10 millisecond intervals into a string {minutes:seconds:milliseconds}
    const formatTime = (time: number) => {
        return `${toMinutes(time)}:${toSeconds(time)}:${toMilliseconds(time)}`
    }

    return(
        <div style={styles.container}>
            {/* displays global formatted timer */}
            <h1 data-testid={'timer'} style={styles.globalTimer}>{formatTime(time)}</h1>
            {/* displays lap entries if timer has started*/}
            <div style={{width: '100%'}}>
                {(laps[0].duration > 0) && 
                // spreads each lap number and duration horizontally
                laps.map((lap) => {
                    return(
                        <div key={lap.number} style={styles.lapEntry}>
                            <h4 style={styles.lapFont}>Lap {lap.number}</h4>
                            <h4 style={styles.lapFont}>{formatTime(lap.duration)}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}