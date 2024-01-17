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

    // Function to format the time into hours, minutes, seconds, milliseconds for display
    const formatTime = (time: number) => {
        const hours = Math.floor((time / 3600000) % 24).toString().padStart(2, "0");
        const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, "0");
        const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
        const milliseconds = Math.floor((time / 10) % 100).toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    };


    return(
    <>
        <StopWatchContainerParent>
            <StopWatchContainer>
                <StopWatchTimerContainer>
                    {formatTime(time)}
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
                            {formatTime(lap)}
                        </StopWatchLapLabel>
                    ))}
                </StopWatchLapContainer>
            </StopWatchContainer>  
        </StopWatchContainerParent>
        <Footer>
            Made with <span style={{ color: "#FF0000" }}>♥</span> by Tudor for <span style={{ color: "#0EC761" }}>Shopfiy</span>
        </Footer>
    </>
    )
}


// Styled container as a parent to hold the StopWatchContainer
const StopWatchContainerParent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
`;

// Styled container to hold the StopWatch
const StopWatchContainer = styled.div`
    width: 80vw;
    height: 96vh;
    background: #B8B7B7;
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
    
    font-size: 8vw;
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

// Styled container to hold the laps
const StopWatchLapContainer = styled.div`
    width: 80%;
    height: 90%;
    margin: 0 0 3vh 0;
    background: #B8B7B7;
    border-radius: 20px;
    box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.30) inset;

    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 2.5vh 4vw;
    padding: 2vh 4vw;
    overflow-y: auto;
`;

// Styled label for each lap
const StopWatchLapLabel = styled.div`
    width: 20%;
    height: 20%;
    background: linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(250,250,250,1) 50%, rgba(200,200,200,1) 100%);
    border-radius: 20px;
    box-shadow: 8px 8px 8px 8px rgba(0, 0, 0, 0.30);

    font-size: 1.5vw;
    font-style: normal;
    font-family: 'Kadwa', serif;
    font-weight: 400;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;
`;

// Styled footer component
const Footer = styled.footer`
    text-align: center;
    padding: 0.5vh 0 0 0;
    font-size: 0.84vw;
    font-family: 'Kadwa', serif;
`;


export default StopWatch;
