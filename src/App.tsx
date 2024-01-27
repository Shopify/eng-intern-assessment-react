import React from 'react';
import StopWatch from './components/StopWatch';
import runningMan from '../images/runningMan.gif';
import './App.css';
import { useState } from 'react';

export default function App() {
    const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);

    return(
      <>
        <img className='runningManImage' src={runningMan}/>
        <div className='wrapper-content'>
          <StopWatch/>
        </div>
      </>
    );
}

