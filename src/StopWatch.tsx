import React from 'react'
import styled from 'styled-components'

export default function StopWatch() {
    return(
        <Container>
            <StopWatchContainer>
                <TimeDisplay>
                    00:02:37
                </TimeDisplay>
            </StopWatchContainer>
            <LapsTable>
                <tbody>
                    <tr>
                        <StyledTd>#2</StyledTd>
                        <StyledTd>0 01.22</StyledTd>
                        <StyledTd>0 02.37</StyledTd>
                    </tr>
                    <tr>
                        <StyledTd>#1</StyledTd>
                        <StyledTd>0 01.15</StyledTd>
                        <StyledTd>0 01.15</StyledTd>
                    </tr>
                </tbody>
            </LapsTable>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 100px;
`

const StopWatchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    border-radius: 300px;
    border: 10px solid #F5F5F5;
`

const TimeDisplay = styled.span`
    color: #5D636C;
    font-size: 35px;
`

const LapsTable = styled.table`
    borderCollapse: collapse;
    font-size: 16px;
    color: #5D636C;
`

const StyledTd = styled.td`
    padding: 4px 8px;
`