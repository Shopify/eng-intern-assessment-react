import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import StopWatchButton from './StopWatchButton';

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 500;
`;

const TimeDisplay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 3vw;
  height: 10vh;
  position: relative;
  background: black;
  color: white;
  margin: 0px 10px 0px 10px;
  padding: 5px;
`;

const TimerCard = styled.div`
  background: #fefae0;
  margin: 10px auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 2px;
  position: relative;
  border-radius: 10px;
  width: 80vh;
  height: 30vh;
  box-sizing: content-box;
`;

const LapList = styled.div`
  background: #fefae0;
  margin: 10px auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 2px;
  position: relative;
  border-radius: 10px;
  width: 50vh;
  height: 60vh;
  box-sizing: content-box;
  padding: 5vh;
  overflow-y: auto;
  font-size: 20px;
  font-weight: 400;
`;

const ContainerGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: 10vh 6vw;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  @media (max-width: 1150px) {
    grid-template-columns: minmax(0, max-content);
  }
`;

export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeId, setTimeId] = useState(null);
    const [laps, setLaps] = useState([]);

    const startTimer = () => {
        setIsRunning(true);
        const startTime = Date.now() - time;
        const updateTimer = () => {
            setTime(Date.now() - startTime);
            const newtimeId = requestAnimationFrame(updateTimer);
            setTimeId(newtimeId);
        };
        const newtimeId = requestAnimationFrame(updateTimer);
        setTimeId(newtimeId);
    };

    const pauseTimer = () => {
        setIsRunning(false);
        if (timeId !== null) {
            cancelAnimationFrame(timeId);
            setTimeId(null);
        }
    };

    const stopTimer = () => {
        setIsRunning(false);
        setTime(0);
        if (timeId !== null) {
            cancelAnimationFrame(timeId);
            setTimeId(null);
        }
    };

    const recordLap = () => {
        const newLap = formattedTime.hours + ":" + formattedTime.minutes + ":" + formattedTime.seconds + ":" + formattedTime.milliseconds;
        setLaps([...laps, newLap]);
    };

    useEffect(() => {
        return () => {
            if (timeId !== null) {
                cancelAnimationFrame(timeId);
            }
        };
    }, [timeId]);

    const clearLaps = () => {
        setLaps([]);
    };

    const formattedTime = {
        hours: Math.floor(Math.floor(Math.floor(time / 1000) / 60) / 60).toString().padStart(2, '0'),
        minutes: (Math.floor(Math.floor(time / 1000) / 60) % 60).toString().padStart(2, '0'),
        seconds: (Math.floor(time / 1000) % 60).toString().padStart(2, '0'),
        milliseconds: (time % 1000).toString().padStart(3, '0').substring(0, 2)
    };

    return (
        <ContainerGrid>
            <TimerCard>
                <TimeContainer>
                    <TimeDisplay>{formattedTime.hours}</TimeDisplay>
                    <TimeDisplay>:{formattedTime.minutes}</TimeDisplay>
                    <TimeDisplay>:{formattedTime.seconds}</TimeDisplay>
                    <TimeDisplay>:{formattedTime.milliseconds}</TimeDisplay>
                </TimeContainer>
                <StopWatchButton
                    isRunning={isRunning}
                    startTimer={startTimer}
                    pauseTimer={pauseTimer}
                    stopTimer={stopTimer}
                    recordLap={recordLap}
                    clearLaps={clearLaps}
                />
            </TimerCard>
            <LapList>
                <p style={{ marginBottom: 20, fontWeight: 500, fontSize: 24 }}>Laps</p>
                {laps.map((lap: any, index: any) => (
                    <div style={{ marginBottom: 10 }} key={index}>{`Lap ${index + 1}: ${lap}`}</div>
                ))}
            </LapList>
        </ContainerGrid>
    )
}