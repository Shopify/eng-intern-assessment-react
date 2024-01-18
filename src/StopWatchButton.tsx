import React from 'react'
import styled from 'styled-components'
import { IoPause, IoPlay , IoRefresh, IoStopwatchOutline } from "react-icons/io5";

export interface StopWatchButtonProps {
    isRunning: boolean; // Running state of the stopwatch
    pause: () => void; // Function to pause stopwatch
    start: () => void; // Function to resume/start stopwatch
    reset: () => void; // Function to reset the stopwatch
    lap: () => void; // Function to log a lap
}

/**
 * Renders action buttons for the stopwatch including the reset, play, pause, and lap buttons 
 */
export default function StopWatchButton(props:StopWatchButtonProps) {
    const {isRunning, pause, start, reset, lap} = props

    return(
        <RowButtonContainer>
            <SecondaryActionButton onClick={reset}>
                <IoRefresh />
            </SecondaryActionButton>
            {/* Conditionally render the play and pause buttons based on running state */}
            {isRunning ? 
                <PrimaryActionButton onClick={pause}>
                    <IoPause />
                </PrimaryActionButton>    
                :
                <PrimaryActionButton onClick={start}>
                    <IoPlay />
                </PrimaryActionButton>
            }
            {/* Hide the lap button if the stopwatch is paused */}
            <SecondaryActionButton isHidden={!isRunning} onClick={lap}>
                <IoStopwatchOutline />
            </SecondaryActionButton>
        </RowButtonContainer>
    )
}

const RowButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
    align-items: center;
`

const ActionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
`

const PrimaryActionButton = styled(ActionButton)`
    height: 80px;
    width: 80px;
    background: #DCE3F5;
    color: #0165FF;
    border-radius: 80px;
    font-size: 30px;
`

// conditionally render the button based on the isHidden prop
const SecondaryActionButton = styled(ActionButton)<{isHidden?:boolean;}>`
    height: 60px;
    width: 60px;
    background: #F5F5F5;
    border-radius: 60px;
    color: #5D636C;
    font-size: 25px;
    visibility: ${props => props.isHidden ? 'hidden' : 'visible'}; 
`