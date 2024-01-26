import React from 'react';
import { Button } from '@mui/material';
import { StopWatchButtonProps } from './stopWatchProps';
import './styles.css';

export default function StopWatchButton(props: StopWatchButtonProps) {

    const { isStopped, setIsStopped, time, setTime, setLaps } = props;

    function handleStartStopClick() {
        setIsStopped(!isStopped);
    }

    function handleResetClick() {
        setTime(0);
        setIsStopped(true);
        setLaps([]);
    }

    function handleLapTimeClick() {
        if (time !== 0) {
            setLaps((prevLaps: number[]) => [...prevLaps, time]);
        }
    }

    return(
        <div className="stop-watch-button-container">
            <Button id="stop-watch-button"
                    variant="contained" 
                    color={isStopped ? "success" : "error"} 
                    onClick={handleStartStopClick}>
                {isStopped ? "Start" : "Stop"}
            </Button>
            <Button id="stop-watch-button"
                    color="info"
                    variant="contained"
                    onClick={isStopped ? handleResetClick : handleLapTimeClick}>
                {isStopped ? "Reset" : "Lap"}
            </Button>
        </div>
    )
}