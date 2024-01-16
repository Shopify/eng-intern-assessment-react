import React from 'react'
import './index.css'

interface StopWatchProps{
	time: string;
}

export default function StopWatch({ time }: StopWatchProps): JSX.Element {
	return(
        <div className="time-wrapper">
			<h1>{time}</h1>
		</div>
    )
}