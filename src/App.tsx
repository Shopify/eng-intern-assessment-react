import React from 'react'
import styled from 'styled-components'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'

export default function App() {

    return(
        <CenteredContainer>
            <StopWatch />
            <StopWatchButton />
        </CenteredContainer>
    )
}

const CenteredContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    font-family: Inter;
`