import React from 'react'
import styled from 'styled-components'
import StopWatchButton from './StopWatchButton'


const StopWatch: React.FC = () => {
    return(
        <StopWatchContainerParent>
            <StopWatchContainer>
                <StopWatchTimerContainer>
                    00:00:00
                </StopWatchTimerContainer>
                <StopWatchButtonContainer>
                    <StopWatchButton label="Start" color="#0EC761" onClick={() => console.log("Start")} />
                    <StopWatchButton label="Stop" color="#E30039" onClick={() => console.log("Stop")} />
                    <StopWatchButton label="Reset" color="#E7A92E" onClick={() => console.log("Reset")} />
                    <StopWatchButton label="Lap" color="#A43AE5" onClick={() => console.log("Lap")} />
                </StopWatchButtonContainer>
            </StopWatchContainer>  
        </StopWatchContainerParent>
    )
}


// Styled container as a parent to hold the StopWatchContainer
const StopWatchContainerParent = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

// Styled container to hold the StopWatch
const StopWatchContainer = styled.div`
    width: 80vw;
    height: 55vh;
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
    
    font-size: 180px;
    font-style: normal;
    font-family: 'Kadwa', serif;
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


export default StopWatch;
