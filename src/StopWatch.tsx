import React from 'react';

// lap type format
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        }}>
            <h1 data-testid={'timer'} style={{fontSize: '40px', margin: '0px'}}>{formatTime(time)}</h1>
            <div style={{
                width: '100%'
            }}>
                {(laps[0].duration > 0) && 
                laps.map((lap) => {
                    return(
                        <div key={lap.number} style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between'
                        }}>
                            <h4 style={{fontSize: '20px'}}>Lap {lap.number}</h4>
                            <h4 style={{fontSize: '20px'}}>{formatTime(lap.duration)}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}