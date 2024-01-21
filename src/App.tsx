import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

// NOTE: Styles should be in their own CSS file, however the problem stated that all necessary files are included

/*
The main component that renders the stopwatch and handles its functionality
*/
export default function App() {
    // state variables
    let [time, setTime] = useState(0); // global time
    let [running, setRunning] = useState(false); // running status of the timer
    let [laps, setLaps] = useState([ // lap information
        {
            number: 1, // lap number
            duration: 0 // lap time
        }
    ])
    
    // updates time on 10 millisecond intervals
    useEffect(() => {
        let interval: NodeJS.Timer; // interval reference
        
        // updates timer if running
        if (running) {
            interval = setInterval(() => {
                setTime(time => time + 1); // updates global time
                setLaps(laps => { // updates lap time
                    laps[laps.length - 1].duration += 1;
                    return laps;
                });
            }, 10);
        }
        return () => clearInterval(interval); // clears interval reference
    }, [running]);

    // toggles the running status
    const startStopTimer = () => {
        setRunning(!running);
    }

    // resets the time and laps
    const resetTimer = () => {
        setTime(0);
        setLaps([
            {
                number: 1,
                duration: 0
            }
        ]);
    }

    // adds a new lap to laps array
    const lapTimer = () => {
        setLaps(laps => {
            laps.push({
                number: laps.length + 1,
                duration: 0
            })
            return laps;
        })
    }
    
    return(
        <div style={{
            marginTop: '40px',
            justifyContent: 'center',
            display: 'flex',
        }}>
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '360px',
            padding: '20px',
            background: 'gainsboro',
            borderRadius: '10px'
            }}>
                <StopWatch time={time} laps={laps}/>
                {!running ?
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        marginTop: '12px'
                    }}>
                        <StopWatchButton data-testid="startbtn" text={time > 0 ? 'RESUME' : 'START'} color={'green'} handleClick={startStopTimer}/>
                        <StopWatchButton text={'RESET'} color={'dimgrey'} handleClick={resetTimer}/>
                    </div>
                :
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginTop: '12px'
                }}>
                        <StopWatchButton text={'STOP'} color={'red'} handleClick={startStopTimer}/>
                        <StopWatchButton text={'LAP'} color={'dimgrey'} handleClick={lapTimer}/>
                    </div>
                }
            </div>
        </div>
    )
}