/**
 * @author Joshua Dierickse <jpcdieri@uwaterloo.ca>
 */

// Imports all dependencies
import React from 'react';
import Button from '@mui/material/Button';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleIcon from '@mui/icons-material/StopCircleOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import MoreTimeIcon from '@mui/icons-material/MoreTime';

/**
 * The stopwatch button element
 *
 * @param buttonFunc - the function that will be triggered when the button is pressed
 * @param buttonName - the name of the button
 * @return JSX Element of the specialized button element
 */
export default function StopWatchButton(props: { buttonFunc: Function, buttonName: string }) {

    // Takes in the button name and returns the corresponding button icon
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

    return (
        <div>
            <Button
                onClick={(event) => { props.buttonFunc(); }}
                sx={{color: "#476930"}}
                color="success"
                startIcon={ iconFunction(props.buttonName) }
                variant="outlined"
            >
                { props.buttonName }
            </Button>
        </div>
    )
}