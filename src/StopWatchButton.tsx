import React from 'react'
import { Button } from '@mui/material';
import './styles.css'
import { timeStamp } from 'console';

export default function StopWatchButton(props: any) {

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
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button id="stop-watch-button"
                    sx={{minWidth: "85px"}}
                    variant="contained" 
                    color={isStopped ? "success" : "error"} 
                    onClick={handleStartStopClick}>
                {isStopped ? "Start" : "Stop"}
            </Button>
            <Button 
                    id="stop-watch-button"
                    sx={{minWidth: "85px"}}
                    color="info"
                    variant="contained"
                    onClick={isStopped ? handleResetClick : handleLapTimeClick}>
                {isStopped ? "Reset" : "Lap"}
            </Button>
        </div>
    )
}