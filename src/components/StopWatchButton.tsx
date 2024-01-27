import React from 'react';
import Button from '@mui/material/Button';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleIcon from '@mui/icons-material/StopCircleOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

export default function StopWatchButton(props: { buttonFunc: Function, buttonName: string }) {

    function iconFunction(iconName: string) {
        if (iconName === "Start") {
            return <PlayCircleFilledWhiteIcon />
        } else if (iconName === "Stop") {
            return <StopCircleIcon />
        } else if (iconName === "Reset") {
            return <RestartAltIcon />
        } else {
            return <MoreTimeIcon />
        }
    }

    return(
        <div>
            <Button onClick={(event) => { props.buttonFunc(); }} sx={{color: "#476930"}} color="success" startIcon={ iconFunction(props.buttonName) } variant="outlined">{ props.buttonName }</Button>
        </div>
    )
}