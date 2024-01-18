import React from 'react'

//for display only

type Time = {
    hundreths: number;
    seconds: number;
    minutes: number;
}

export default function StopWatch({  hundreths, seconds, minutes  }: Time) {
    const [time, setTime] = React.useState<Time>();

    React.useEffect(() => {
        setTime({  hundreths, seconds, minutes  });
    }, [hundreths, seconds, minutes])

    return(
        <div>
            <div className='minutes' data-testid='minutes'>
                <h1>{minutes}</h1>
            </div>
            <h1>:</h1>
            <div className='seconds' data-testid='seconds'>
                <h1>{seconds}</h1>
            </div>
            <h1>:</h1>
            <div className='hundreths' data-testid='hundreths'>
                <h1>{hundreths}</h1>
            </div>
        </div>
    )
}