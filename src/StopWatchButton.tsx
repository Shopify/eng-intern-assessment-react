import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import "./StopWatchButton.css"

const StopWatchButton: React.FC = ({ }) => {
    return(
        <div className="button-container">
            <button className="button-start"><FontAwesomeIcon icon={faPlay} /></button>
            <button className="button-stop"><FontAwesomeIcon icon={faStop} /></button>
            <button className="button-reset"><FontAwesomeIcon icon={faRotateRight} /></button>
        </div>
    );
};

export default StopWatchButton;