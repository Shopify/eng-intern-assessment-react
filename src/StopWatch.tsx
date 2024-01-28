import React, {Dispatch,SetStateAction} from 'react'
import App from './App';
import './Stopwatch.css';
//props for StopWatch 
type StopWatchProps ={
    timerArray: number[];
    setTimerArray: Dispatch<SetStateAction<number[]>>;
}
//Displays the time.Seperated into hours mintues and secodns 
const StopWatch: React.FC<StopWatchProps> = ({ timerArray, setTimerArray }) => {
    return (
        <div className='timestring'>
            <p className="timertext">{timerArray[0]}</p> 
            <span>:</span>
            <p className="timertext">{timerArray[1]}</p>
            <span>:</span>
            <p className="timertext">{timerArray[2]}</p>
        </div>
    );
}
export default StopWatch;