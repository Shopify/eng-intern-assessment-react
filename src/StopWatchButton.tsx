import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo, faTrash} from '@fortawesome/free-solid-svg-icons';
import './utils/styles.css'

interface StopWatchButtonProps {
    onToggleRun: () => void;
}

const StopWatchButton = ({onToggleRun} : StopWatchButtonProps) => {
    const [isRunning, setIsRunning] = useState(false);
  

    const handlePlayOrPauseClick = () => {
        setIsRunning(!isRunning);
        onToggleRun();
    };

    const handleLapCick = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const handleTrashClick = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    return (
        <div className="button-group">
        <FontAwesomeIcon icon={isRunning ? faPause : faPlay} className="icon" onClick={handlePlayOrPauseClick} />
        <FontAwesomeIcon icon={faUndo} className="icon" onClick={handleLapCick} />
        <FontAwesomeIcon icon={faTrash} className="reset-icon" onClick={handleTrashClick} />
        </div>
    );
};

export default StopWatchButton;
