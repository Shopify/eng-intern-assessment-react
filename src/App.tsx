import React, {useState} from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './styles.css';

export default function App() {
    const[time, setTime] = useState<number>(0);

    return(
        <>
            <StopWatch />
            <StopWatchButton />
        </>
    )
}