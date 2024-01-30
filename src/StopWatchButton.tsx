import React, {useState} from 'react'

// Defines the prop types
type Props = {
    //Function for setting time in milliseconds
    setTimeInMilliseconds : Function;
    //Function for lap times
    setLapTimes: React.Dispatch<React.SetStateAction<number[]>>;
    timeInMilliseconds: number;
};

export default function StopWatchButton(props:Props) {
    
    //Destructure the props
    const {setTimeInMilliseconds, timeInMilliseconds} = props;
    //Defining variable, ID of the interval
    const [intervalId, setIntervalId] = useState<number>(0);
    //Defining if the watch is running or not
    const [isRunning, setIsRunning] = useState<boolean>(false);

    //Play button function
    const playButton = () => {
        //if stopwatch is running, button will not work
        if (isRunning) return;

        setIsRunning(true);

        //Creates an interval to update the clock every 10 milliseconds
        const interval:any = setInterval(() => {
            setTimeInMilliseconds((previousState:number) => previousState + 10);
        }, 10);

        setIntervalId(interval);
    }

    //Defines the stop button
    const stopButton = () => {
        // Clear interval and set running to false 
        clearInterval(intervalId);
        setIsRunning(false);
    }

    //Defines the lap button
    const lapButton = () => {
        //Add current time at lap to lap time list 
        props.setLapTimes(prevLapTimes => [...prevLapTimes, timeInMilliseconds]);
    }

    //Defines the reset button
    const resetButton = () => {
        clearInterval(intervalId); //clears interval
        setTimeInMilliseconds(0); //resets clock to 0
        props.setLapTimes([]); //clears the lap times
        setIsRunning(false); // set watch running to false
    }

    return(
        //renders each button on the screen
        <div className = "button-container">
            <button onClick={playButton}>Play</button>
            <button onClick={stopButton}>Stop</button>
            <button onClick={lapButton}>Lap</button>
            <button onClick={resetButton}>Reset</button>
        </div>
    )
}
