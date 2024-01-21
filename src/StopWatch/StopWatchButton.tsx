import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {IconDefinition} from "@fortawesome/free-solid-svg-icons"

type Props = {
    onClick: () => void;
    icon: IconDefinition;
    testId: string;
}
export default function StopWatchButton({onClick, icon, testId}:Props) {
    return (
        <div className="icon-wrapper">
            <FontAwesomeIcon data-testid={testId} onClick={onClick} size="6x" icon={icon}/>
        </div>
    )
}