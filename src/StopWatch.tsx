import React, { useEffect, useState } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';
import { Timer } from './types/Timer';

export default function StopWatch() {
	const [timer, setTimer] = useState<Timer>({
		time: 0,
		isRunning: false,
		laps: [],
	});

	const { time, isRunning } = timer;

	useEffect(() => {
		let interval: NodeJS.Timer;
		if (isRunning) {
			interval = setInterval(
				() => setTimer({ ...timer, time: time + 1 }),
				10
			);
		}
		return () => clearInterval(interval);
	}, [time, isRunning]);

	const toggleTimer = () => {
		setTimer({ ...timer, isRunning: !isRunning });
	};

	const resetTimer = () => {};

	const lapTimer = () => {};

	return (
		<main>
			<h1 className='title'>Stopwatch</h1>
			<h2 className='time'>{time}</h2>
			<StopWatchButton onClick={toggleTimer}>
				{!isRunning ? 'Start' : 'Stop'}
			</StopWatchButton>
			<StopWatchButton onClick={lapTimer}>Lap</StopWatchButton>
			<StopWatchButton onClick={resetTimer}>Reset</StopWatchButton>
		</main>
	);
}

