// Import Libraries & Components
import React, {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StopWatchButton from './StopWatchButton';
import ShowLapsHistory from './ShowLapsHistory';
import "./stylesheets/stopWatch.css";

export default function StopWatch() {
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [timeArray, setTimeArray] = useState<Array<string>>([]);
    const [timeLaps, setTimeLaps] = useState<Array<string>>([])

    /*
    Parameter: Takes in 1 parameter `timeInSeconds`, with the type `number`.
    Functionality: Converts a given number into a time consisting of hours, minutes and seconds.
    Return: Returns an array consisting of hours, minutes and seconds.
    */
    function calculateTimeInSeconds(timeInSeconds: number) {
        let hours = Math.floor(timeInSeconds / 3600);
        let minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
        let seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
        
        return [
            hours < 10 ? `0${hours}` : hours.toString(),
            minutes < 10 ? `0${minutes}` : minutes.toString(),
            seconds < 10 ? `0${seconds}` : seconds.toString()
        ];
    }

    /*
    Parameter: None, does not take any parameters
    Functionality: A hook that records a lap time and adds it to the `timeLaps` array. Consists of error handling, such as duplicate laps are not allowed and a lap cannot occur if the stopwatch has not started itself.
    Returns: Void, does not return anything
    */
    function logLap() {

        if (timeLaps.length === 0) {
            if (timeArray[0] != "00" || timeArray[1] != "00" || timeArray[2] != "00") {
                let currentLoggedLap = timeArray[0] + ":" + timeArray[1] + ":" +  timeArray[2]
                setTimeLaps([...timeLaps, currentLoggedLap])
            } else {
                // A toast notification
                toast.error('[Error Code: 00:00:00] Please Start the Stopwatch First');
            }
        } else {
            let lastIndex = timeLaps.length-1;
            let lastLoggedTime = timeLaps[lastIndex].split(":")

            if (timeArray[0] !=  lastLoggedTime[0] || timeArray[1] != lastLoggedTime[1] || timeArray[2] != lastLoggedTime[2]) {
                let currentLoggedLap = timeArray[0] + ":" + timeArray[1] + ":" +  timeArray[2]
                setTimeLaps([...timeLaps, currentLoggedLap])
            } else {
                // A toast notification
                toast.error('[Error Code: Duplicate Lap Found] The Current Lap Already Exists');
            }
        }
    }

    /*
    A React hook used to handle side effects in React such as updating data, and in our case, it updates the `timeArray` whenever `timeInSeconds` changes
    */
    useEffect(() => {
        setTimeArray(calculateTimeInSeconds(timeInSeconds));
    }, [timeInSeconds]);

    return(
        <div className="main">
            <h1> <strong>The Unique Stopwatch</strong> </h1>

            <div className="hour">
                <p className='time-element' id="hour" data-testid="watch-hour">{timeArray[0]}</p>
                <p className='caption'>Hours</p>
            </div>
            <p className='colon'>:</p>
            <div className="min">
                <p className='time-element' id="minute" data-testid="watch-min">{timeArray[1]}</p>
                <p className='caption'>Minutes</p>
            </div>
            <p className='colon'>:</p>
            <div className="sec">
                <p className='time-element' id="second" data-testid="watch-sec">{timeArray[2]}</p>
                <p className='caption'>Seconds</p>
            </div>

            {/* 
                Properties: Consists of 3 props -- `setTimeInSeconds`, `setLap`, and `clearLap`. Each of these are a function performing certain tasks
                Usage: A component which contains the logic and UI for the three button in the stopwatch
            */}
            <StopWatchButton 
                setTimeInSeconds={setTimeInSeconds} 
                setLap={logLap} 
                // Clear Lap: An arrow function that simply clears the `timeLaps` state 
                clearLap={() => { setTimeLaps([]) }}
            />
            <br /> <hr />

            <div className="timeLaps">
                {/* 
                    Properties: Consists of 1 prop -- `ShowLaps`
                    Usage: Passes in the `timeLaps` state as a value for the child component to display
                */}
                <ShowLapsHistory showLaps={timeLaps} />
            </div>
            
            {/* Toast Notification Component from the `react-toastify` Library */}
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}