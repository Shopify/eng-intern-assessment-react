import React from 'react'

interface StopWatchButtonProps{
	text: string;
}

export default function StopWatchButton({ text }: StopWatchButtonProps): JSX.Element {
    return(
        <div>
			<button>{text}</button>
		</div>
    )
}