import React, { useState, useEffect } from 'react'
import StopWatchButton from './StopWatchButton'

export default function StopWatch() {
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [laps, setLaps] = useState<Array<string>>([])
    const [run, setRun] = useState<boolean>(false)

    const formatZero = (num: number): string => {
        if(num < 10){
            return "0" + num
        }

        else return num.toString()
    }

    const recordLap = (reset: boolean) => {

        if(reset){
            setLaps([])
        }

        else{
        let resultLap: string = formatZero(hours) + ":" + formatZero(minutes) + ":" + formatZero(seconds)
        setLaps([...laps, resultLap])
        }
    }


    useEffect(() => {
        let interval: number;

        if(run){
            interval = window.setInterval(() => {
                setSeconds((seconds: number) => {
                    if(seconds >= 59){
                        setMinutes((minutes: number) =>{
                            if(minutes >= 59){
                                setHours((hours: number) => hours + 1);
                                return 0;
                            } else {
                                return minutes + 1;
                            }
                        });

                        return 0;
                    } else {
                        return seconds + 1;
                    }

                });

                return 0;
            }, 1000);
        }
        return () => clearInterval(interval);
    
    
}, [run])



    return(
        <div>
             <div className="timeDisplay"> 
                {formatZero(hours)} : {formatZero(minutes)} :{" "} {formatZero(seconds)} 
                <StopWatchButton 
                    setRun={setRun} 
                    setSeconds={setSeconds}
                    setMinutes={setMinutes}
                    setHours={setHours}
                    recordLap={recordLap}
                    />
                    <ol> {laps} </ol>
            </div> 
        </div>
    )
}

