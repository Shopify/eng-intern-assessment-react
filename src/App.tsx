import React from 'react'
import StopWatch from './StopWatch';

type Time = {
    hundreths: number;
    seconds: number;
    minutes: number;
}

export default function App() {
    const [time, setTime] = React.useState<number>(0);

    React.useEffect(()=>{
        let interval: NodeJS.Timeout;

        interval = setInterval(()=>{
            setTime((time)=> time + 10);
        }, 10);
        console.log(time);

    })

    return(
        <div>
            <StopWatch 
            hundreths={Math.floor((time/10)%100)} 
            seconds={Math.floor(((time/1000)%60))} 
            minutes={Math.floor(time/60000)}/>
        </div>
    )
}