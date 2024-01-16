import React from 'react'

interface StopWatchProps{
	time: string;
}

export default function StopWatch({ time }: StopWatchProps): JSX.Element {
    return(
        <div>
			<p>{time}</p>
		</div>
    )
}