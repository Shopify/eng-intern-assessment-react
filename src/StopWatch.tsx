import React, { useState, useEffect } from 'react'

export default function StopWatch() {
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [laps, setLaps] = useState<Array<number>>([])
    const [run, setRun] = useState<boolean>(false)

    const formatZero = (num: number): string => {
        if(num < 10){
            return "0" + num
        }

        else return num.toString()
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
            }, 10);
        }
        return () => clearInterval(interval);
    
    
}, [run])



    return(
        <div>
             <div className="timeDisplay"> 
                {formatZero(hours)} : {formatZero(minutes)} :{" "} 
                {formatZero(seconds)} 
            </div> 
        </div>
    )
}