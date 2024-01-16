import React from 'react'
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  appearance: button;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #fff 4px 4px 0 0, #000 4px 4px 0 1px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin: 10px 5px 10px 10px;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  &:not(:disabled):active {
    box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
  }
`;

export default function StopWatchButton({ isRunning, startTimer, pauseTimer, stopTimer, recordLap, clearLaps }: any) {
    return (
        <ButtonContainer>
            <StyledButton style={{ background: '#2a9d8f', color: 'white' }} onClick={startTimer} disabled={isRunning}>Start</StyledButton>
            <StyledButton style={{ background: '#e9c46a', color: 'white' }} onClick={pauseTimer} disabled={!isRunning}>Pause</StyledButton>
            <StyledButton style={{ background: '#e63946', color: 'white' }} onClick={stopTimer}>Stop</StyledButton>
            <StyledButton style={{ background: '#1d3557', color: 'white' }} onClick={recordLap} disabled={!isRunning}>Lap</StyledButton>
            <StyledButton style={{ background: '#1d3557', color: 'white' }} onClick={clearLaps}>Clear Laps</StyledButton>
        </ButtonContainer>
    );
};