import React from 'react';
import StopWatch from './StopWatch';
import './styles/App.css';

export default function App() {
	return (
		<main>
			<h1 className='title'>My Stopwatch app</h1>
			<StopWatch />
		</main>
	);
}

