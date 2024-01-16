import React from 'react'
import { useState, useEffect } from 'react'
import StopWatch from './StopWatch'
import StopWatchButton from './StopWatchButton'
import './index.css'

export default function App() {

	const [buttonMessage, setButtonMessage] = useState<string>('Start');
	const [time, setTime] = useState<number>(0);
	const [isStarted, start] = useState<boolean>(false);
	const [laps, setLaps] = useState<number[]>([]);

	useEffect(() => {
		// Updating time and changing button message
		let testVar: any;
		if (isStarted) {
			testVar = setInterval(() => setTime(time + 1), 10);
			setButtonMessage('Stop')
		}else{
			setButtonMessage('Start')
		}
		return () => clearInterval(testVar);
	}, [isStarted, time]) 

	const timeCalc = (time: any) => {
		const hours = Math.floor(time / 360000);
		const minutes = Math.floor((time % 360000) / 6000);
		const seconds = Math.floor((time % 6000) / 100);
		const milliseconds = time % 100;
		const currentTime = hours.toString() + ":" + minutes.toString().padStart(2,"0") + ":" + seconds.toString().padStart(2,"0") + "." + milliseconds.toString().padStart(2,"0");
		return currentTime;
	}
	
	const timeDiff = (time1: number, time2: number) => {
		return Math.abs(time2-time1);
	}

	const startStop = () => {
		start(!isStarted)
	};

	const reset = () => {
		start(false);
		setTime(0);
		setLaps([]);
	};

	const addLap = () => {
		setLaps((prevLaps) => [...prevLaps, time])
	};

	const startProps = {
		text: buttonMessage,
	};
	const resetProps = {
		text: 'Reset',
	};
	const watchProps = {
		time: timeCalc(time),
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
					{isStarted? 
					<StopWatchButton {...lapProps} onClick={addLap}/>
				:false}
					<StopWatchButton {...resetProps} onClick={reset}/>
				</div>
				<div className="laps-wrapper">
						<h3>Laps:</h3>
						<hr></hr>
						{laps.length > 0 && (
							<ul>
								{laps.map((lap, index) => (
									<li key={index}>
										<span>{timeCalc(timeDiff(lap, (index !== 0) ? laps[index-1]:0))}</span>
									</li>
								))}
							</ul>
						)}
				</div>
			</div>
		</div>
    )
}