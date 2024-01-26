import React, { useState, useEffect } from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';
import './appstyles.css';

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [lapTimes, setLapTimes] = useState<number[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let intervalId: number;
        if (isRunning) {
            intervalId = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const Time = (time: number): string => {
        const hours = Math.floor(time / 360000);
        const minutes = Math.floor((time % 360000) / 6000);
        const seconds = Math.floor((time % 6000) / 100);
        const milliseconds = time % 100;

        return `${String(hours).padStart(2, '0')}: ${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}: ${String(milliseconds).padStart(2, '0')}`
    };

    const handleStartStopClick = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const handleResetClick = () => {
        setIsRunning(false);
        setTime(0);
        setLapTimes([]);
    };

    const handleLapClick = () => {
        setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
      };

      const toggleModal = () => {
        setShowModal(!showModal);
      };

    return (
        <div style={{ backgroundColor:"#000000", width: "100%", height: "100vh", textAlign: "center", color: "#EEF1F1"}}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",  color: "#EEF1F1"}}>
                <h5>Shopify Stopwatch</h5>
                <div className='container'>
                    <div className='time-container'>
                        <StopWatch
                            time={time}
                            Time={Time}
                        />
                        <div className='Laps'>LAPS - {lapTimes.length}</div>
                        <button className="LapTimesButton" onClick={toggleModal}> Show Laps</button>
                    </div>
                    <StopWatchButton
                        isRunning={isRunning}
                        onStartStopClick={handleStartStopClick}
                        onResetClick={handleResetClick}
                        onLapClick={handleLapClick}
/>
                </div>
                </div> 
                {showModal && (
                            <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={toggleModal}>&times;</span>
                                <h2>Lap Times</h2>
                                <ul>
                                {lapTimes.map((lapTime, index) => (
                                    <li key={index}>{Time(lapTime)}</li>
                                ))}
                                </ul>
                            </div>
                            </div>
                        )}
            </div>
    )
}