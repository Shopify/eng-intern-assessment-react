import React from 'react'
import styled from 'styled-components'
import { IoPause, IoPlay , IoRefresh, IoStopwatchOutline } from "react-icons/io5";

export default function StopWatchButton() {

    return(
        <RowButtonContainer>
            <SecondaryActionButton>
                <IoRefresh />
            </SecondaryActionButton>
            <PrimaryActionButton>
                <IoPlay />
            </PrimaryActionButton>
            <SecondaryActionButton>
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

const SecondaryActionButton = styled(ActionButton)`
    height: 60px;
    width: 60px;
    background: #F5F5F5;
    border-radius: 60px;
    color: #5D636C;
    font-size: 25px;
`