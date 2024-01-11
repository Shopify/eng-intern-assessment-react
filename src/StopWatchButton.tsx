import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faUndo, faTrash} from '@fortawesome/free-solid-svg-icons';
import './utils/styles.css'

export default function StopWatchButton() {
    return(
        <div className="button-group">
            <FontAwesomeIcon icon={faPlay} className="icon" />
            <FontAwesomeIcon icon={faPause} className="icon" />
            <FontAwesomeIcon icon={faUndo} className="icon" />
            <FontAwesomeIcon icon={faTrash} className="reset-icon" />
        </div>
    )
}