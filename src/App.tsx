import React, {useState, useEffect} from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [elapsedMilliSecond, setElapsedMilliSecond] = useState(0);
    const [isLapClicked, setIsLapClicked] = useState(false);
    const [lapElaspedMilliSecond, setLapElapsedMilliSecond] = useState(0);
    const [lapList, setLapList] = useState([]);
    
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        let lapInterval: NodeJS.Timeout | null = null;

        if(isTimeRunning == true) {
        interval = setInterval(() => {
            setElapsedMilliSecond(prevElapsedMilliSec => prevElapsedMilliSec + 10);
        }, 10);

        if(isLapClicked == true) {
            console.log(formatMilliSeconds(lapElaspedMilliSecond));
            setLapList(currLapList => {
            return [...currLapList, formatMilliSeconds(lapElaspedMilliSecond)]
            })
            setLapElapsedMilliSecond(0);
            setIsLapClicked(false);
        }

        lapInterval = setInterval (() => {
            setLapElapsedMilliSecond(prevElapsedMilliSec => prevElapsedMilliSec + 10);
        }, 10)
        } 

        return () => {
        clearInterval(interval);
        clearInterval(lapInterval);
        }

    }, [isTimeRunning, isLapClicked]);

    
    useEffect(() => {
        console.log(lapList);
    }, [lapList]);

    function formatMilliSeconds(milliSecond: number) {
        let second = Math.floor(milliSecond/1000);
        let minute = Math.floor(second/60);
        let hour = Math.floor(minute/60);
        let hundrethSecond = (milliSecond/10)%100; 
        let hundrethSecondFormat = hundrethSecond < 10? `0${hundrethSecond}` : hundrethSecond;

        return `${hour}h : ${minute % 60}m : ${second % 60}s.${hundrethSecondFormat}`;
    }

    function displayLapTable() {
        return lapList.map((lap, i) => {
          return ( 
            <tr>
              <td>{i+1}</td>
              <td>{lap}</td>
            </tr>)
        })
    }
    

    function handleReset() {
        setElapsedMilliSecond(0);
        setIsTimeRunning(false);
        setLapElapsedMilliSecond(0);
        setLapList([]);
    }

    return(
        <div>
            <div className="stopWatchContainer">
                <StopWatch formattedElapsedMilliSecond={formatMilliSeconds(elapsedMilliSecond)}/>
                
                <div className="buttonContainer">
                    {!isTimeRunning && <StopWatchButton onClick={() => setIsTimeRunning(true)} label="Start"/>}
                    {<StopWatchButton onClick={() => handleReset()} label="Reset"/>}
                    {isTimeRunning && <StopWatchButton onClick={() => setIsTimeRunning(false)} label="Stop"/>}
                    {isTimeRunning && <StopWatchButton onClick={() => isTimeRunning && setIsLapClicked(true)} label="Lap"/>}
                </div>
            </div>

            <div className="lapTableContainer">
                {lapList.length > 0 && <table className="lapTable">
                <thead>
                    <tr>
                    <th>Lap No.</th>
                    <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {displayLapTable()}
                </tbody>
                </table>}
            </div>                   
        </div>
    )
}
