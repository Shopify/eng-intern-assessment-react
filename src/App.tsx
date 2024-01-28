import React from 'react';
import StopWatch from './components/StopWatch';
// import runningMan from '../images/runningMan.gif';
// import './App.css';
import { useState } from 'react';

export default function App() {

  //A state that determines if the stop watch is running. Passed into stopwatch component. 
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);

  return(
    <>
      {/* <img className={`${isTimeRunning ? 'runningMan' : 'stillMan'}`} src={runningMan}/> */}
      <div className='wrapper-content'>
        <StopWatch isTimeRunning={isTimeRunning} setIsTimeRunning={setIsTimeRunning}/>
      </div>
    </>
  );
}

