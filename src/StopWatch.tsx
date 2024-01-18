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

    // Ratio of current lap time to first lap time, used for visualizing comparison to inital lap
    const initialLapRatio = laps.length > 0 && currentLap ? (currentLap.lapTime % laps[0].lapTime) / laps[0].lapTime : 0
    
    // Ratio of previous completed lap to first lap time, used to add an indicator to the ring for comparison
    const previousLapRatio = laps.length > 1 ? (laps[laps.length - 1].lapTime % laps[0].lapTime) / laps[0].lapTime : 0

    return(
        <Container data-testid="stopwatch">
            {/* Stopwatch face */}
            <StopWatchContainer>
                {/* A circling ring which rotates based on the first lap time recorded */}
                <LapTimerRing ringratio={initialLapRatio} />
                <WatchFace />
                {/* A small indicitor which shows where the previous lap ended in comparison to the first lap timen recorded */}
                <PreviousLapIndicator ratio={previousLapRatio} />
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
    
    @media (max-width: 900px) {
        flex-direction: column;
        gap: 40px;
    }
`

const StopWatchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    position: relative;

    @media (max-width: 900px) {
        width: 230px;
        height: 230px;
    }
`

// displays the ring which cycles based on the first lap time
const LapTimerRing = styled.div<{ringratio:number}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 300px;
    border-radius: 300px;
    background-color: #D3DAED;
    z-index: 1;
    background-image: ${props => 
        props.ringratio <= 0.5 ? `linear-gradient(${props.ringratio * 360 + 90}deg, transparent 50%, #F5F5F5 50%), linear-gradient(90deg, #F5F5F5 50%, transparent 50%)`:
        `linear-gradient(${props.ringratio * 360 - 90}deg, transparent 50%, #D3DAED 50%), linear-gradient(90deg, #F5F5F5 50%, transparent 50%)`
    };

    @media (max-width: 900px) {
        width: 230px;
        height: 230px;
    }
`
// displays a small indicator which shows where the previous lap ended in comparison to the first lap time
const PreviousLapIndicator = styled.div<{ratio:number}>`
    width: 5px;
    height: 10px;
    background: #0165FF;
    border-radius: 5px;
    position: absolute;
    z-index: 4;
    transform: ${props => `rotateZ(${360 * props.ratio}deg) translateY(-145px)`};

    @media (max-width: 900px) {
        transform: ${props => `rotateZ(${360 * props.ratio}deg) translateY(-110px)`};
    }
`

const WatchFace = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 280px;
    height: 280px;
    border-radius: 280px;
    background-color: white;
    z-index: 2;

    @media (max-width: 900px) {
        width: 210px;
        height: 210px;
    }
`

const TimeDisplay = styled.span`
    color: #5D636C;
    font-size: 35px;
    z-index: 3;

    @media (max-width: 900px) {
        font-size: 28px;
    }
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

    @media (max-width: 900px) {
        max-height: 200px;
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