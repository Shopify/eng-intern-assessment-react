import React, {useState, useEffect} from 'react';
import StopWatch from './StopWatch';
import StopWatchButton from './StopWatchButton';

import { formatTime } from '../util/helpers';
import '../util/styles.css';

export default function App() {
	const [time, setTime] = useState(0);
	const [laps, setLaps] = useState([]);
	const [isRunning, setIsRunning] = useState(false);
	
	const startTimer = () => setIsRunning(true);
	const stopTimer = () => setIsRunning(false);
	const lapTimer = () => {
		const currentLap = laps.length + 1;
		setLaps((prevLaps) => [
			`Lap ${currentLap}: ${formatTime(time)}`,
			...prevLaps
		])
	}
	const resetTimer = () => {
		setTime(0);
		setLaps([]);
		setIsRunning(false);
	};

	// In the case we want to add more buttons in the future, we 
	// can just add them to this array of stopWatch functionalities
	const stopwatchFunctions = [
		{
			id: 1,
			display: 'Start',
			onButtonClick: startTimer,
		},
		{
			id: 2,
			display: 'Stop',
			onButtonClick: stopTimer,
		},
		{
			id: 3,
			display: 'Lap',
			onButtonClick: lapTimer,
		},
		{
			id: 4,
			display: 'Reset',
			onButtonClick: resetTimer,

		},
	];

	useEffect(() => {
		let interval: any = null;
		
		if (isRunning) {
			interval = setInterval(() => {
				setTime(prevTime => prevTime + 1);
			}, 1)
		} else if (!isRunning && time !== 0) {
			clearInterval(interval)
		}

		return () => clearInterval(interval)
	}, [time, isRunning]);

    return(
        <div className='appContainer'>
			<h1 className='appHeader'>StopWatch App 🙀⏱️</h1>
			<StopWatch time={time}/>
			<div className='buttonContainer'>
				{stopwatchFunctions.map((value, id) => {
					return <StopWatchButton key={id} {...value}/>
				})}
			</div>
			<ul className='lapContainer'>
				{laps.map((value, id) => (
					<li key={id}>{value}</li>
				))}
			</ul>
		</div>
    )
}
