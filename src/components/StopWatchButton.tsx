/**
 * @author Jaza Khan <jaza-k@protonmail.com>
 */

import React from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";
import FlagIcon from "@mui/icons-material/Flag";
import stopwatchButtonStyles from "../styles/stopwatchButtonStyles";

interface StopwatchButtonProps {
    isRunning: boolean;
    onToggleStartStop: () => void;
    onReset: () => void;
    onLap: () => void;
}

const StopwatchButton: React.FC<StopwatchButtonProps> = ({ isRunning, onToggleStartStop, onReset, onLap }) => {
    return (
        <>
            <IconButton 
                onClick={onReset} 
                aria-label="Reset"
                sx={stopwatchButtonStyles.resetLapButtonStyle}
            >
                <ReplayIcon fontSize="medium"/>
            </IconButton>
            <IconButton 
                onClick={onToggleStartStop} 
                aria-label={isRunning ? "Pause" : "Start"}
                sx={stopwatchButtonStyles.startStopButtonStyle}
            >
                {isRunning ? <PauseIcon fontSize="medium" /> : <PlayArrowIcon fontSize="medium" />}
            </IconButton>
            <IconButton 
                onClick={onLap} 
                disabled={!isRunning} 
                aria-label="Lap"
                sx={stopwatchButtonStyles.resetLapButtonStyle}
            >
                <FlagIcon fontSize="medium"/>
            </IconButton>
        </>
    );
};

export default StopwatchButton;
