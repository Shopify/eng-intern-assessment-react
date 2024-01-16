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
        </StopWatchContainer>
    </StopWatchContainerParent>
    )
}


const StopWatchContainerParent = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

// Styled container to hold the StopWatch
const StopWatchContainer = styled.div`
    width: 85vw;
    height: 60vh;
    background: #b8b7b7;
    border-radius: 30px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.40);

    display: flex;
    justify-content: center;

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

// Styled container to hold the StopWatchTimer
const StopWatchTimerContainer = styled.div`
    width: 100%;
    height: 50%;
    margin: 5vh;
    background: linear-gradient(0deg, rgba(217,217,217,1) 0%, rgba(250,250,250,1) 50%, rgba(217,217,217,1) 100%);
    border-radius: 15px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;

    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 100px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;


export default StopWatch;
