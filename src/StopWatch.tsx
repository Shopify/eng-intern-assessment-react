import React, { useState, useEffect } from 'react';
import { displayTime, centiSecondsToDisplayFormat } from './utils';
import StopWatchButton from './StopWatchButton';
import Laps from './Laps';

const styles: { [key: string]: React.CSSProperties } = {
    stopWatchContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeDisplay: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px'
    },
    stopWatchCircle: {
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: '#ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
    },
    buttonsContainer: {
        width: '40vw',
        justifyContent: 'space-between',
        display: 'flex'
    }
};

const StopWatch = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [centiseconds, setCentiseconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [isCounting, setIsCounting] = useState('reset');
    const [totalTimeAtPrevLap, setTotalTimeAtPrevLap] = useState(0);
    const [lapList, setLapList] = useState([]);

    useEffect(() => {
        // set or clear intervals according to whether we are counting
        if (!intervalId && isCounting === 'counting') {
            const intervalID = setInterval(updateTime, 10);
            setIntervalId(intervalID);
        }
        if (intervalId && (isCounting === 'stopCounting' || isCounting === 'reset')) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        //Clearing the interval when dismounting
        return () => clearInterval(intervalId);
    }, [isCounting]);

    // reset everything
    if (isCounting === 'reset' && (centiseconds != 0 || seconds != 0 || minutes != 0 || hours != 0)) {
        setCentiseconds(0);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setLapList([]);
        setTotalTimeAtPrevLap(0);
    }

    const addLapTime = (lapTime: string) => {
        // only allow laps to be added if time is not zeroed
        if (isCounting != 'reset') {
            const newLap = calculateLap(lapTime);
            // only allow laps to be added if time has ran since the last lap
            if (newLap) {
                setLapList([...lapList, newLap]);
            }
        }
    }

    // calculate time between the current lap and last lap
    const calculateLap = (currLapTime: string) => {
        const [hours, minutes, rest] = currLapTime.split(':');
        const [seconds, centiseconds] = rest.split('.');
        const currTimeInCentiseconds = parseInt(hours, 10) * 360000 + parseInt(minutes, 10) * 6000 + parseInt(seconds, 10) * 100 + parseInt(centiseconds, 10);
        
        const diffInCentiseconds = currTimeInCentiseconds - totalTimeAtPrevLap;
        setTotalTimeAtPrevLap(currTimeInCentiseconds);
        // lapTime is the time for the individual lap, overallTime is total elapsed time
        // only allow laps to be added if time is not zeroed
        if (diffInCentiseconds > 0) {
            return {
                lapTime: centiSecondsToDisplayFormat(diffInCentiseconds),
                overallTime: centiSecondsToDisplayFormat(currTimeInCentiseconds)
            }
        } else {
            return null;
        }
    }

    // increments time on stopwatch 
    function updateTime() {
        setCentiseconds((prevCentiseconds) => {
            if (prevCentiseconds === 99) {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes((prevMinutes) => {
                            if (prevMinutes === 59) {
                                setHours((prevHours) => prevHours + 1);
                                return 0;
                            } else {
                                return prevMinutes + 1;
                            }
                        });
                        return 0;
                    } else {
                        return prevSeconds + 1;
                    }
                });
                return 0;
            } else {
                return prevCentiseconds + 1;
            }
        })
        
    }

    return (
        <div style={styles.stopWatchContainer}>
            <div style={styles.stopWatchCircle}>
                <h1 style={styles.timeDisplay}>{displayTime(hours, minutes, seconds, centiseconds)}</h1>
            </div>
            <div style={styles.buttonsContainer}>
                {/* button will be start if stopwatch is at 0, pause if timer is running, and resume if timer is paused i.e. not at 0 */}
                <StopWatchButton text={isCounting === "counting" ? 'Pause' : isCounting === "stopCounting" ? 'Resume' : 'Start'} onClick={() => setIsCounting(isCounting === "counting" ? 'stopCounting' : 'counting')}></StopWatchButton>
                <StopWatchButton text="Reset" onClick={() => setIsCounting('reset')}></StopWatchButton>
                <StopWatchButton text="Lap" onClick={() => addLapTime(displayTime(hours, minutes, seconds, centiseconds))}></StopWatchButton>
            </div>
            <Laps lapList={lapList}></Laps>
        </div>
    )
}

export default StopWatch;
