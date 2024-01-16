import React from 'react'
import { useState } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import './index.css'

export default function App() {

	const [buttonMessage, setButtonMessage] = useState<string>('Start');
	const currentTime = new Date();

	const startProps = {
		text: buttonMessage,
	};
	const resetProps = {
		text: 'Reset',
	};
	const watchProps = {
		time: currentTime.toLocaleTimeString()
	}

    return(
		<div className="container">
			<div className="wrapper">
				<div>
					<StopWatch {...watchProps} />
				</div>
				<div className="buttons-wrapper">
					<StopWatchButton {...startProps}/>
					<StopWatchButton {...resetProps}/>
				</div>
			</div>
		</div>
    )
}