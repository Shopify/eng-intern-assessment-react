import React, { useEffect, useState } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';
import { Timer } from './types/Timer';

export default function StopWatch() {
	const [timer, setTimer] = useState<Timer>();

	useEffect(() => {}, []);

	const startTimer = () => {};

	const stopTimer = () => {};

	const resetTimer = () => {};

	const lapTimer = () => {};

	return (
		<main>
			<h1 className='title'>Stopwatch</h1>
			<h2 className='time'>{time}</h2>
			<StopWatchButton onClick={startTimer}>Start</StopWatchButton>
			<StopWatchButton>Stop</StopWatchButton>
			<StopWatchButton>Lap</StopWatchButton>
			<StopWatchButton>Reset</StopWatchButton>
		</main>
	);
}

