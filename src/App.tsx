import React, { useState, useEffect } from 'react'

export default function App() {
    const [timeSec, setTimeSec] = useState<number>(0);
    const [watchArray, setWatchArray] = useState<Array<number>>([])

    useEffect(() => {
        let watchArray: Array<number> = calcTime(timeSec);
        setWatchArray(watchArray);
    }, [timeSec]);

    return(
        <div>
            <p className='watch-text'>{watchArray[0]}</p>
            <span>:</span>
            <p className='watch-text'>{watchArray[1]}</p>
            <span>:</span>
            <p className='watch-text'>{watchArray[2]}</p>
            
        </div>
    );
}

function calcTime(timeSec: number): Array<number>{
    const convert = 3600;
    
    let hrs: number = Math.floor(timeSec / convert);
    let mins: number = Math.floor((timeSec - (hrs * convert))/60);
    let secs: number = Math.floor(timeSec - (hrs * convert) - (mins*60));



    return[
        hrs,
        mins,
        secs
    ];
}