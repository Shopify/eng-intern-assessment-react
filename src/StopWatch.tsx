import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import StopWatchButton from './StopWatchButton'


const StopWatch: React.FC = () => {
    const [time, setTime] = useState(0);  // State for time
    const [isOn, setIsOn] = useState(false);  // State for on/off
    const [lapTime, setLapTime] = useState<number[]>([]) // State for laps

    // Function to start the timer
    const setOn = () => {
        setIsOn(true);
    }

    // Function to stop the timer
    const setOff = () => {
        setIsOn(false);
    }

    // Function to reset the timer
    const reset = () => {
        setTime(0);
        setIsOn(false);
        setLapTime([]);
    }

    // Function to add lap time
    const addLap = () => {
        setLapTime([...lapTime, time]);
    }

    // Increments the timer every 10ms
    useEffect(() => {
        let interval: any = null;
        if (isOn) {  // Check if the timer is on
            interval = setInterval(() => {  // Interval that runs every 10ms
                setTime((time) => time + 10);  // Incrementing the time by 10ms
            }, 10);
        } else if (!isOn && time !== 0) { // Check if the timer is off and the time is not 0 
            clearInterval(interval);
        }
        return () => clearInterval(interval);  // Clear the interval
    });

    // Converting the time into hours, minutes, seconds, milliseconds
    const hours = Math.floor((time / 3600000) % 24);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);


    return(
        <StopWatchContainerParent>
            <StopWatchContainer>
                <StopWatchTimerContainer>
                    {hours.toString().padStart(2, "0")}
                    :{minutes.toString().padStart(2, "0")}
                    :{seconds.toString().padStart(2, "0")}
                    :{milliseconds.toString().padStart(2, "0")}
                </StopWatchTimerContainer>
                <StopWatchButtonContainer>
                    <StopWatchButton label="Start" color="#0EC761" onClick={setOn} />
                    <StopWatchButton label="Stop" color="#E30039" onClick={setOff} />
                    <StopWatchButton label="Reset" color="#E7A92E" onClick={reset} />
                    <StopWatchButton label="Lap" color="#A43AE5" onClick={addLap} />
                </StopWatchButtonContainer>
                <StopWatchLapContainer>
                    {lapTime.map((lap, index) => (  // Map over the laps and display them 
                        <StopWatchLapLabel key={index}>
                            {lap}
                        </StopWatchLapLabel>
                    ))}
                </StopWatchLapContainer>
            </StopWatchContainer>  
        </StopWatchContainerParent>
    )
}


// Styled container as a parent to hold the StopWatchContainer
const StopWatchContainerParent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

// Styled container to hold the StopWatch
const StopWatchContainer = styled.div`
    width: 80vw;
    height: 96vh;
    background: #b8b7b7;
    border-radius: 30px;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.30) inset;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

// Styled container to hold the StopWatchTimer
const StopWatchTimerContainer = styled.div`
    width: 90%;
    height: 70%;
    margin: 5vh 5vh 2vh;
    background: linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(250,250,250,1) 50%, rgba(200,200,200,1) 100%);
    border-radius: 20px;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.30);

    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 200px;
    font-style: normal;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 400;
    line-height: normal;
`;

// Styled container to hold the buttons
const StopWatchButtonContainer = styled.div`
    width: 100%;
    height: 35%;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const StopWatchLapContainer = styled.div`
    width: 90%;
    height: 90%;
    margin: 0 0 3vh 0;
    background: #b8b7b7;
    border-radius: 20px;
    box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.30) inset;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const StopWatchLapLabel = styled.div`
    width: 25%;
    height: 10%;
    margin: 2vh 2wh;
    background: linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(250,250,250,1) 50%, rgba(200,200,200,1) 100%);
    border-radius: 20px;
`;


export default StopWatch;
