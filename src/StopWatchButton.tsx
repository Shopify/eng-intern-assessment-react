import React, {useState} from 'react'

type Props = {
    setTimeInMilliseconds : Function;
    setLapTimes: React.Dispatch<React.SetStateAction<number[]>>;
    timeInMilliseconds: number;
};

export default function StopWatchButton(props:Props) {
    const {setTimeInMilliseconds, timeInMilliseconds} = props;
    const [intervalId, setIntervalId] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const playButton = () => {
        if (isRunning) return;

        setIsRunning(true);

        const interval:any = setInterval(() => {
            setTimeInMilliseconds((previousState:number) => previousState + 10);
        }, 10);

        setIntervalId(interval);
    }

    const stopButton = () => {
        clearInterval(intervalId);
        setIsRunning(false);
    }

    const lapButton = () => {
        props.setLapTimes(prevLapTimes => [...prevLapTimes, timeInMilliseconds]);
    }

    const resetButton = () => {
        clearInterval(intervalId);
        setTimeInMilliseconds(0);
        props.setLapTimes([]);
        setIsRunning(false);
    }

    return(
        <div className = "button-container">
            <button onClick={playButton}>Play</button>
            <button onClick={stopButton}>Stop</button>
            <button onClick={lapButton}>Lap</button>
            <button onClick={resetButton}>Reset</button>
        </div>
    )
}
