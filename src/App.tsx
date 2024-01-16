import React from 'react'
import { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import './index.css'

export default function App() {

	const [buttonMessage, setButtonMessage] = useState<string>('Start');
	const currentTime = new Date();
	const [time, setTime] = useState<number>(0);
	const [isStarted, start] = useState<boolean>(false);

	useEffect(() => {
		let testVar: any;
		if (isStarted) {
			testVar = setInterval(() => setTime(time + 1), 10);
			setButtonMessage('Stop')
		}else{
			setButtonMessage('Start')
		}
		return () => clearInterval(testVar);
	}, [isStarted, time]) 

	const startStop = () => {
		start(!isStarted)
	};

	const reset = () => {
		setTime(0);
	};


	const hours = Math.floor(time / 360000);
	const minutes = Math.floor((time % 360000) / 6000);
	const seconds = Math.floor((time % 6000) / 100);
	const milliseconds = time % 100;

	const startProps = {
		text: buttonMessage,
	};
	const resetProps = {
		text: 'Reset',
	};
	const watchProps = {
		time: (hours.toString() + ":" + minutes.toString().padStart(2,"0") + ":" + seconds.toString().padStart(2,"0") + ":" + milliseconds.toString().padStart(2,"0")),
	};
	const lapProps = {
		text: 'Lap',
	}

    return(
		<div className="container">
			<div className="wrapper">
				<div>
					<StopWatch {...watchProps} />
				</div>
				<div className="buttons-wrapper">
					<StopWatchButton {...startProps} onClick={startStop}/>
					<StopWatchButton {...resetProps} onClick={reset}/>
				</div>
			</div>
		</div>
    )
}