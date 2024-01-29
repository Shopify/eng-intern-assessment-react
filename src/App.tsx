import React, {useState, useEffect} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

const doSomething = () => {

}

export default function App() {
    return(
        <>
            <StopWatch elapsedMilliSecond={1}/>
            <StopWatchButton onClick={doSomething} label="Start"/>
        </>
    )
}