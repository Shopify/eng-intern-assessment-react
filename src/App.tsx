import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

// style sheet
const styles = {
    body: {
        marginTop: '40px',
        justifyContent: 'center',
        display: 'flex'
    },
    container: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '360px',
            padding: '20px',
            background: 'gainsboro',
            borderRadius: '10px'     
    },
    buttonBox: {    
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: '12px'
    }
}

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
    const onStartStop = () => {
        setRunning(!running);
    }

    // resets the time and laps
    const onReset = () => {
        setTime(0);
        setLaps([
            {
                number: 1,
                duration: 0
            }
        ]);
    }

    // adds a new lap to laps array
    const onLap = () => {
        setLaps(laps => {
            laps.push({
                number: laps.length + 1,
                duration: 0
            })
            return laps;
        })
    }
    
    return(
        <div style={styles.body}>
            <div style={styles.container}>
                {/* displays global and lap timers */}
                <StopWatch time={time} laps={laps}/>
                {/* buttons conditionally rendered based on running status */}
                {!running ?
                    // Start/Resume and Reset buttons
                    <div style={styles.buttonBox}>
                        {/* start/resume button conditionally labeled based on timer value */}
                        <StopWatchButton data-testid="startbtn" text={time > 0 ? 'RESUME' : 'START'} color={'green'} handleClick={onStartStop}/>
                        <StopWatchButton text={'RESET'} color={'dimgrey'} handleClick={onReset}/>
                    </div>
                :
                    // Stop and Lap buttons
                    <div style={styles.buttonBox}>
                        <StopWatchButton text={'STOP'} color={'red'} handleClick={onStartStop}/>
                        <StopWatchButton text={'LAP'} color={'dimgrey'} handleClick={onLap}/>
                    </div>
                }
            </div>
        </div>
    )
}