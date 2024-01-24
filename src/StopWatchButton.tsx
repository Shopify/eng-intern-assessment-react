import React from 'react'
import { Button } from '@mui/material';
import './styles.css'

export default function StopWatchButton(props: any) {

    const { isStopped, setIsStopped, setTime } = props;


    function handleStartStopClick() {
        setIsStopped(!isStopped);
    }

    function handleResetClick() {
        setTime(0);
        setIsStopped(true);
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
                    color="info"
                    variant="contained">
                Lap
            </Button>
            <Button
                    id="stop-watch-button"
                    variant="contained" 
                    color="info" 
                    onClick={handleResetClick}>
                Reset
            </Button>
        </div>
    )
}