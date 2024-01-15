import React from 'react'

/*** 
 * This component is a button that is used to control the stopwatch
 * It takes in a title, onClick function, and disabled prop
*/

type Props = {
    title: string;
    onClick: () => void;
    disabled?: boolean;
}
export default function StopWatchButton({title, onClick, disabled}: Props) {
    
    if(disabled === null || disabled === undefined) disabled = false;

    return(
        <button title={title} type='button' aria-label={title} onClick={onClick} disabled={disabled} className='stop-watch-btn' id={`${title.toLowerCase()}-btn`}>{title}</button>
    )
}