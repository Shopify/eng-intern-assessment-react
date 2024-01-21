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
    // pads left digit with a zero when value is a single digit
    const padTwoDigits = (value: number) => {
        return value.toString().padStart(2,'0');
    }

    // converts millisecond time to minutes integer
    const toMinutes = (time: number) => {
        return padTwoDigits(Math.floor(time/6000));
    }

    // converts millisecond time to seconds integer
    const toSeconds = (time: number) => {
        return padTwoDigits(Math.floor(time/100) % 60);
    }

    // converts millisecond time to milliseconds integer
    const toMilliseconds = (time: number) => {
        return padTwoDigits(Math.floor(time) % 100);
    }

    // formats time string {minutes:seconds:milliseconds}
    const formatTime = (time: number) => {
        return `${toMinutes(time)}:${toSeconds(time)}:${toMilliseconds(time)}`
    }

    return(
        <div style={styles.container}>
            <h1 data-testid={'timer'} style={styles.globalTimer}>{formatTime(time)}</h1>
            <div style={{width: '100%'}}>
                {(laps[0].duration > 0) && 
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