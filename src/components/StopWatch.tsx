import React from 'react'
import './../styles/StopWatch.css'
import StopWatchButton from './StopWatchButton'
import LapTable from './LapTable'

interface LapTableProps { 
    lap: string[][]; 
    setLap: React.Dispatch<React.SetStateAction<string[][]>>;
  } 

export default function StopWatch({lap, setLap}: LapTableProps) {

    return(
        <div className="stopwatch-container row text-center">
            <div className="stopwatch-border">
                <div id="stopwatch" className="timer-circle">
                    <div className="col-sm">
                        <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>.<span id="milliseconds">00</span>
                        <StopWatchButton lap={lap} setLap={setLap}></StopWatchButton>
                    </div>
                </div>
            </div>
            <div className="lap-table-container">
                <div className="lap-table row text-center mt-3">
                    {lap.length > 0 &&(
                        <LapTable lap={lap} />
                    )}
                </div>
            </div>
        </div>)
}