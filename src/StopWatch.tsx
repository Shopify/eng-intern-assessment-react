import React, {useState, useEffect, useRef} from 'react'
import StopWatchButton from './StopWatchButton';
import './StopWatch.css'

interface StopWatchProps {
    isRunning: boolean;
    onStart: () => void;
    onStop: () => void;
}

const StopWatch: React.FC<StopWatchProps> = ({isRunning, onStart, onStop}) => {
    // the state to store time
    const [time, setTime] = useState(0);

    // the state to store laps time
    const [laps, setLaps] = useState<number[]>([]);

    // the state to display laps table
    const [showLapsTable, setShowLapsTable] = useState(false)

    // the state to store whether the timer is stopped.
    const [wasStopped, setWasStopped] = useState(false)

    const lastLapTimeRef = useRef<number | null>(null)

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 0);

            if (wasStopped) {
                lastLapTimeRef.current = time;
                setWasStopped(false)
            }
        }

        return () => clearInterval(intervalId);
    }, [isRunning, time, wasStopped]);

    const formatTime = (milliseconds: number) => {
        const formattedHours = Math.floor(milliseconds / 360000)
        const formattedMinutes = Math.floor((milliseconds % 360000) / 6000);
        const formattedSeconds = Math.floor((milliseconds % 6000) / 100);
        const formattedMilliseconds = milliseconds % 100

        return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}.${formattedMilliseconds.toString().padStart(2, '0')}`
    }


    // start timer with 'Start' button or restart timer after 'Stop'
    const startTimer = () => {
        onStart();

        if (wasStopped) {
            lastLapTimeRef.current = time;
            setWasStopped(false)
        }
        else {
            lastLapTimeRef.current = time;
        }
    
    }

    const stopTimer = () => {
        onStop();

        if (isRunning) {
            const lapTime = lastLapTimeRef.current !== null ? time - lastLapTimeRef.current : 0;

            lastLapTimeRef.current = time;
            setLaps((prevLaps) => [...prevLaps, lapTime])
            setShowLapsTable(true)
            lastLapTimeRef.current = null
        } else {
            setWasStopped(true)
        }
    }

    const reset = () => {
        setTime(0);
        
        // clear laps on reset
        setLaps([]);

        // hide the laps table when reset
        setShowLapsTable(false)

        lastLapTimeRef.current = null
    }

    const lap = () => {
        if (isRunning) {
            // calculate lap time and add to laps array
            const lapTime = lastLapTimeRef.current !== null ? time - lastLapTimeRef.current : time
            lastLapTimeRef.current = time
            setLaps((prevLaps) => [...prevLaps, lapTime])
            setShowLapsTable(true);
        }
    }
    return (
        <div className='stopWatch'>
            <p className='stopWatchDisplay'>
                {formatTime(time)}
            </p>
            <StopWatchButton
                startTimer={startTimer}
                stopTimer={stopTimer}
                reset={reset}
                lap={lap}
            />
            <div className={`lapTableContainer ${showLapsTable ? 'show': ''}`}>
                <table className='lapTable'>
                    <thead>
                        <tr>
                            <th>lap no.</th>
                            <th>split</th>
                            <th>total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...laps].reverse().map((lapTime, index) =>  (
                                <tr key={index} className={index === 0 ? 'newestLap' : index === 1 ? 'secondLap' : ''}>
                                    <td>
                                        {laps.length - index}
                                    </td>
                                    <td>{formatTime(lapTime)}</td>
                                    <td>{formatTime(laps.slice(0, laps.length - index).reduce((acc, lap) => acc + lap, 0))}</td>
                                </tr>
                            
                        ))}
                    </tbody>
                
                
                </table>
            </div>

        </div>
    )
}
export default StopWatch