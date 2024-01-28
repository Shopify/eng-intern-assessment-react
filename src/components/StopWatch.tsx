import React, { useEffect } from 'react';
// import '../styles/StopWatch.css';
import { useState } from 'react';
import StopWatchButton from './StopWatchButton';

export type StopWatchProps = {
  isTimeRunning: boolean,
  setIsTimeRunning: Function
}

export default function StopWatch(props: StopWatchProps) {
 
  let isTimeRunning: boolean = props.isTimeRunning; 

  // States which will be used to keep track of time, whether the stop watch is being ran and the laps selected by user.
  const [time, setTime] = useState<number>(0);
  const [timeList, setTimeList] = useState<(number|string)>(0);
  // const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);
  const [lapsList, setLapsList] = useState<(number|string)[]>([]);

  // Tells the page to re render when the time is changed, which is every second
  useEffect(() => {
    let tempTime: (number|string) = timeFormat(time);
    setTimeList(tempTime);
  }, [time]);

  const [intervalID, setIntervalID] = useState<number>(0)
  
  // checks if the stop watch is running and if so, adds the current time to the lap list.
  const runLap = () => {
    isTimeRunning ? setLapsList(laps => [... laps, timeFormat(time)]) : null;
  }
  const [label, setLabel] = useState<string>('Start');
  
  return(
    <>
      <div className='timer-container'>
        <div>{timeList}</div>
      </div>

      <div className='buttons-container'>
        <StopWatchButton onClick={() => runStartStop(isTimeRunning,
                                               props.setIsTimeRunning,
                                               setTime,
                                               intervalID,
                                               setIntervalID,
                                               label,
                                               setLabel)} label={label} />

        <StopWatchButton onClick={() => runReset(props.setIsTimeRunning, 
                                           setTime, 
                                           intervalID, 
                                           setLapsList)} label={'Reset'}/>
        <StopWatchButton onClick={runLap} label={'Lap'}/>
      </div>

      <div className='laps-container'>
        <div className='lapsTitle'>Laps</div>
      {/* a ordered list, with each lap mapped to a list item */}
          <ol className='lapsList'>
            {lapsList.map((lap) => (
              <li>{lap}</li>
            ))}
          </ol>
      </div>
    </>
  );

}

// A function that determines the number of hours, minutes and seconds, and returns a formatted time
const timeFormat = (time: number): number|string => {
  
  let hours: number|string = Math.floor(time / 3600);
  let mins: number|string = Math.floor((time - (hours * 3600)) / 60);
  let secs: number|string = time - (hours * 3600) - (mins * 60);

  // Adds a '0' before the integer if the integer is less then 10 (i.e., 9 -> 09). Common pratice among stop watches
  hours = hours < 10 ? `0${hours}` : hours;
  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;
  
  return `${hours}:${mins}:${secs}`;
}

// A function that is invoked when the start/stop button is pressed.
const runStartStop = (isTimeRunning: boolean, 
                      setIsTimeRunning: Function,
                      setTime: Function,
                      intervalID: number,
                      setIntervalID: Function,
                      label: string,
                      setLabel: Function) => {

  // Checks if the time is currently running, if it is NOT continuesly increments the time by 1 each second
  if (!isTimeRunning) {
    let interval: any = setInterval(() => {
      setTime((prev: number) => prev + 1)
    }, 1000);

    setIntervalID(interval);
  
  } else { // If time is running, it means the stop button was pressed and we nee to pause the time.
    clearInterval(intervalID);
  }  

  setIsTimeRunning(!isTimeRunning);
  label == 'Start' ? setLabel('Stop') : setLabel('Start');
}

// A function that resets the time dispalyed to 0 as well as the laps 
const runReset = (setIsTimeRunning: Function,
                  setTime: Function,
                  intervalID: number,
                  setLapsList: Function) => {

  clearInterval(intervalID);
  setTime(0);
  setIsTimeRunning(false);
  setLapsList([]);
}