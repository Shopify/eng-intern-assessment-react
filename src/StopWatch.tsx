import React, { useEffect, useState } from 'react'

export default function StopWatch() {
    const [counter, setCounter] = useState(0);

    // Empty dependency array because we don't want useEffect to
    // run anytime other than at initial component render
    useEffect(() => {
        const intervalID = setInterval(() => {
            setCounter(counter => counter + 1);
        }, 1000)

        return () => {
            clearInterval(intervalID);
        }
    }, [])

    return(
        <>
            <p>{counter}s</p>
        </>
    )
}