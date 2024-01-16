import React from 'react'

interface StopWatchButtonProps{
	text: string;
	onClick: () => void;
}

export default function StopWatchButton({ text, onClick }: StopWatchButtonProps): JSX.Element {
    return(
        <div>
			<button onClick={onClick}>{text}</button>
		</div>
    )
}