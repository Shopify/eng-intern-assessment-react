import React from 'react'
import StopWatch from './StopWatch';
import './App.css'; 
import './StopWatch.css'; 
import './StopWatchButton.css';
const App = () => {
    //display the stopwatch on the app page 
    return (
      <div>
      <div className='container'>
      <h1>Stopwatch Lap Timer</h1>
      <h3>Making Timing Better For Everyone.</h3>
      <StopWatch></StopWatch>
      <h3>By: Anisha Mohapatra</h3>
      </div>
      <div className='svg2'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
        <path fill="#96BF48" fill-opacity="1" d="M0,160L30,176C60,192,120,224,180,208C240,192,300,128,360,112C420,96,480,128,540,160C600,192,660,224,720,197.3C780,171,840,85,900,85.3C960,85,1020,171,1080,197.3C1140,224,1200,192,1260,176C1320,160,1380,160,1410,160L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
        </path>
        </svg>
      </div>
      </div>
);
}
export default App;