import React from 'react'

//for display only; functionality of keeping time implemented in App.tsx

//should recieve a Time object as its prop
type Time = {
    hundredths: number;
    seconds: number;
    minutes: number;
}


export default function StopWatch({  hundredths, seconds, minutes  }: Time) {
    const [time, setTime] = React.useState<Time>();

    React.useEffect(() => {
        setTime({  hundredths, seconds, minutes  });
    }, [hundredths, seconds, minutes])


    const displayStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: '10rem',
        lineHeight: '10rem',
        marginBottom: '-8rem'
    } 

    const numbersStyle: React.CSSProperties = {
        width: '1.6em',
    } 

    return(
        <div style={displayStyle}>
            <div className='minutes' style={numbersStyle} data-testid='minutes'>
                <h1>{String(minutes).padStart(2, '0')}</h1>
            </div>
            <h1>:</h1>
            <div className='seconds'style={numbersStyle} data-testid='seconds'>
                <h1>{String(seconds).padStart(2, '0')}</h1>
            </div>
            <h1>:</h1>
            <div className='hundredths'style={numbersStyle} data-testid='hundredths'>
                <h1>{String(hundredths).padStart(2, '0')}</h1>
            </div>
        </div>
    )
}

export type {Time};