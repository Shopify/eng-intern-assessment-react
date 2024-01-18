import React from 'react'
import styled from 'styled-components'
import {Lap} from './App'

export interface StopWatchProps {
    time: number; // Stopwatch time in 10s of milliseconds
    laps: Lap[]; // Array of Lap objects 
    currentLap: Lap | null; // Lap object to represent the current in progress lap
}

const formatTime = (time:number):string => {
    /**
     * Returns a string formatted version of a time in 10s of milliseconds in the format mm:ss:ms
     */
    const minutes = Math.floor((time / 6000)).toString().padStart(2, "0")
    const seconds = Math.floor(((time % 6000) / 100)).toString().padStart(2, "0")
    const milliseconds = Math.floor((time % 100)).toString().padStart(2, "0")
    return `${minutes}:${seconds}:${milliseconds}`
}

/**
 * Component which renders the stopwatch face along with a table of 
 * lap data and live data on the current lap
 */
export default function StopWatch(props:StopWatchProps) {

    const {time, laps, currentLap} = props

    return(
        <Container data-testid="stopwatch">
            {/* Stopwatch face */}
            <StopWatchContainer>
                <TimeDisplay data-testid="time-display">
                    {formatTime(time)}
                </TimeDisplay>
            </StopWatchContainer>
            {/* Conditionally render lap data if laps exist */}
            {laps.length > 0 && <LapsTableContainer>
                <LapsTable>
                    <ReveresedTableBody data-testid="laps-table">
                        {/* Render the data of each individual lap */}
                        {laps.map((lap:Lap, index:number) => {
                            return (
                                <tr key={`lap-${index}`}>
                                    {/* lap number */}
                                    <StyledTd>#{index + 1}</StyledTd> 
                                    {/* lap time */}
                                    <StyledTd>{formatTime(lap.lapTime)}</StyledTd>
                                    {/* time since beginning */}
                                    <StyledTd>{formatTime(lap.totalTime)}</StyledTd>
                                </tr>
                            )
                        })}
                        {/* Render the data on the current in progress lap */}
                        {currentLap && <tr>
                            {/* lap number */}
                            <StyledTd>#{laps.length + 1}</StyledTd>
                            {/* time since last lap */}
                            <StyledTd>{formatTime(currentLap.lapTime)}</StyledTd>
                            {/* time since beginning */}
                            <StyledTd>{formatTime(currentLap.totalTime)}</StyledTd>
                        </tr>}
                    </ReveresedTableBody>
                </LapsTable>
            </LapsTableContainer>}
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

const LapsTableContainer = styled.div`
    max-height: 280px;
    overflow-y: auto;
    padding-right: 20px;
    &::-webkit-scrollbar-thumb {
        width: 10px;
        background: #D8D8D8;
        border-radius: 10px;
    }
    &::-webkit-scrollbar {
        width: 10px;
        background:#F5F5F5;
        border-radius: 10px;
    }
`

const LapsTable = styled.table`
    borderCollapse: collapse;
    font-size: 16px;
    color: #5D636C;
`

// reverse order of rows so recent laps appear first
const ReveresedTableBody = styled.tbody`
    display: flex; 
    flex-direction: column-reverse;
`

const StyledTd = styled.td`
    padding: 4px 8px;
`