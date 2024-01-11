import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo, faTrash} from '@fortawesome/free-solid-svg-icons';
import './utils/styles.css'

interface StopWatchButtonProps {
    onPlayOrPause: () => void
    onLap: () => void;
    onReset: () => void;
}

const StopWatchButton = ({onPlayOrPause, onLap, onReset} : StopWatchButtonProps) => {
    const [isRunning, setIsRunning] = useState(false);

    const handlePlayOrPauseClick = () => {
        setIsRunning(!isRunning);
        onPlayOrPause();
    };

    const handleLapCick = () => {
        onLap();
    };

    const handleResetClick = () => {
        onReset();
        setIsRunning(false);
    };

    return (
        <div className="button-group">
            <FontAwesomeIcon icon={isRunning ? faPause : faPlay} className="icon" onClick={handlePlayOrPauseClick} />
            <FontAwesomeIcon icon={faUndo} className="icon" onClick={handleLapCick} />
            <FontAwesomeIcon icon={faTrash} className="reset-icon" onClick={handleResetClick} />
        </div>
    );
};

export default StopWatchButton;
